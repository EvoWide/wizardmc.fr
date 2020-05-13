import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/User/LoginValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { authenticator } from 'otplib'

export default class SessionsController {
  public async store ({ auth, request, response, session }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    const user = await User.query().preload('security').where('username', data.username).first()
    if (!user || user.username !== data.username || !(await Hash.verify(user.password, data.password))) {
      return response.globalError('Identifiants invalides.', 422)
    }

    if (user.security && user.security.method === 'otp') {
      session.put('auth-otp', {
        user_id: user.id,
        secret: user.security.secret,
        time: Date.now() + 120,
      })
      return response.json({ security: 'otp' })
    }

    auth.login(user)
    return response.globalSuccess('Vous vous êtes connecté avec succès.')
  }

  public async check ({ auth, request, response, session }: HttpContextContract) {
    const data = session.get('auth-otp')
    if (!data || data.time <= Date.now()) {
      session.forget('auth-otp')
      return response.globalError('Vous avez mis trop de temps pour vérifier votre compte.')
    }

    const token = request.input('token')
    if (!authenticator.verify({ token: token, secret: data.secret })) {
      return response.globalError('Le token entré est incorrect.')
    }

    session.forget('auth-otp')
    auth.loginViaId(data.user_id)
    return response.globalSuccess('Vous vous êtes connecté avec succès.')
  }

  public async destroy ({ auth, response, session }: HttpContextContract) {
    await auth.logout()

    // Remove bought Shop offers
    session.forget('offers')

    return response.globalSuccess('Vous vous êtes déconnecté avec succès.')
  }
}
