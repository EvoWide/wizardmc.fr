/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/User/LoginValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { authenticator } from 'otplib'

export default class SessionsController {
  public async store({ auth, request, response, session }: HttpContextContract) {
    const data = await request.validate(LoginValidator)
    const remember = !!request.post().remember

    const user = await User.query().preload('security').where('username', data.username).first()
    if (
      !user ||
      user.username !== data.username ||
      !(await Hash.verify(user.password, data.password))
    ) {
      return response.abort('Identifiants invalides.', 422)
    }

    // Clear session before login to try to remove the "auth bug"
    await auth.logout()
    session.clear()

    if (user.security && user.security.method === 'otp') {
      session.put('auth-otp', {
        user_id: user.id,
        secret: user.security.secret,
        time: DateTime.local().plus({ minute: 2 }),
        remember: remember,
      })
      return response.json({ security: 'otp' })
    }

    auth.login(<never>user, remember)
    return 'Vous vous êtes connecté avec succès.'
  }

  public async verify({ auth, request, response, session }: HttpContextContract) {
    const data = session.get('auth-otp')
    if (!data || data.time <= Date.now()) {
      session.forget('auth-otp')
      return response.abort('Vous avez mis trop de temps pour vérifier votre compte.')
    }

    const token = request.input('token')
    if (!authenticator.verify({ token: token, secret: data.secret })) {
      return response.abort('Le token entré est incorrect.')
    }

    session.forget('auth-otp')
    const user = await User.query().where('id', data.user_id).firstOrFail()
    auth.login(<never>user, data.remember)

    return 'Vous vous êtes connecté avec succès.'
  }

  public async destroy({ auth, session }: HttpContextContract) {
    await auth.logout()

    // Remove bought Shop offers, shop histories, ...
    session.clear()

    return 'Vous vous êtes déconnecté avec succès.'
  }
}
