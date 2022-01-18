/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail'
import { DateTime } from 'luxon'
import UserRequest from 'App/Models/UserRequest'
import { verifyToken } from 'App/helpers'

export default class PasswordRequestController {
  /**
   * Method used when user (guest) forgot his password
   * @param ctx
   */
  public async forget({ request, response }: HttpContextContract) {
    const { email } = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email({
            sanitize: true,
          }),
        ]),
      }),
      messages: {
        'email.email': 'Email incorrecte.',
      },
    })

    let user: User
    try {
      user = await User.query().where('email', email).firstOrFail()
    } catch (error) {
      return response.status(422).send({ errors: [{ field: 'email', message: 'Email inconnue.' }] })
    }

    await this.store(request, response, user)
  }

  /**
   * Method used when user (logged) want to change his password
   * @param ctx
   */
  public async change({ request, response, auth }: HttpContextContract) {
    await this.store(request, response, auth.user!)
  }

  /**
   * Private method used by both (guest and logged) methods to send mail
   * @param request
   * @param response
   * @param user
   */
  private async store(request: RequestContract, response: ResponseContract, user: User) {
    if (!(await UserRequest.isAllowed(user))) {
      return response.abort('Trop de mail ont été envoyés avec ce mail, veuillez patienter.')
    }

    const token = UserRequest.generateToken()

    const origin = request.headers().origin as string
    const url = `/users/password-requests?token=${token}`

    await Mail.send((message) => {
      message
        .to(user.email)
        .from('noreply@wizardmc.fr', 'WizardMC')
        .subject('WizardMC - Réinitialisation de votre mot de passe')
        .htmlView('emails/reset_password', { url: origin + url, user })
    })

    await user.related('requests').create({
      method: 'change-password',
      token: token,
    })

    return 'Un mail a été envoyé'
  }

  public async update({ request, response, params }: HttpContextContract) {
    const token = params.token as string

    if (!verifyToken(token)) {
      return response.abort('La requête est incorrect.')
    }

    const { password } = await request.validate({
      schema: schema.create({
        password: schema.string({}, [rules.minLength(5)]),
      }),
      messages: {
        'password.minLength': 'Mot de passe pas assez sécurisé.',
      },
    })

    const passwordRequest = await UserRequest.query()
      .where('token', token)
      .where('created_at', '>', DateTime.local().minus({ hour: 3 }).toSQL())
      .where('expired', 0)
      .preload('user')
      .first()

    if (!passwordRequest || !passwordRequest.user) {
      return response.abort('La requête est incorrect.')
    }

    passwordRequest.user.password = password
    await passwordRequest.user.save()

    passwordRequest.expired = true
    await passwordRequest.save()

    return 'Le mot de passe a bien été modifié'
  }
}
