import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { authenticator } from 'otplib'
import qrcode from 'qrcode'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import UserRequest from 'App/Models/UserRequest'
import { DateTime } from 'luxon'

export default class SecurityController {
  // Appelé en get sans argument
  public async enable ({ request, response, auth }: HttpContextContract) {
    const user = auth.user!
    const security = await user.related('security').query().first()
    if (security) {
      return response.globalError('La 2FA est déjà activée sur votre compte.')
    }

    if (!(await UserRequest.isAllowed(user))) {
      return response.globalError('Vous avez effectué trop de changement, veuillez patienter.')
    }

    const origin = request.headers().origin as string
    const token = UserRequest.generateToken()

    const url = `/users/security/enable?token=${token}`

    await Mail.send((message) => {
      message.to(user.email)
        .from('noreply@wizardmc.fr', 'WizardMC')
        .subject('WizardMC - Activation de la double authentification')
        .htmlView('emails/enable_2fa', { url: origin + url, user })
    })

    await user.related('requests').create({
      method: 'enable-otp',
      data: authenticator.generateSecret(),
      token: token,
    })

    return response.globalSuccess('Un mail a été envoyé')
  }

  public async disable ({ request, response, auth }: HttpContextContract) {
    const user = auth.user!
    const security = await user.related('security').query().first()

    if (!security || security.method !== 'otp') {
      return response.globalError('La 2FA OTP n\'est pas activé sur votre compte.')
    }

    if (!(await UserRequest.isAllowed(user))) {
      return response.globalError('Vous avez effectué trop de changement, veuillez patienter.')
    }

    const origin = request.headers().origin as string

    const token = UserRequest.generateToken()
    const url = Route.makeUrl('disableSecurity', {
      params: {
        token: token,
      },
    })

    await Mail.send((message) => {
      message.to(user.email)
        .from('noreply@wizardmc.fr', 'WizardMC')
        .subject('WizardMC - Désactivation de la double authentification')
        .htmlView('emails/disable_2fa', { url: origin + url, user })
    })

    await user.related('requests').create({
      method: 'disable-otp',
      token: token,
    })

    return response.globalSuccess('Un mail a été envoyé')
  }

  public async delete ({ response, params, auth }: HttpContextContract) {
    const user = auth.user!
    const token = params.token as string

    // replace with global helper??
    if (!token.match(/^[a-z0-9]+$/i) || token.length !== 32) {
      return response.globalError('La requête est incorrect.')
    }

    const mailRequest = await auth.user!.related('requests').query()
      .where('token', params.token)
      .where('user_id', auth.user!.id)
      .where('expired', 0)
      .where('created_at', '>', DateTime.local().minus({ minute: 30 }).toSQL())
      .firstOrFail()

    if (!mailRequest) {
      return response.globalError('La requête est incorrect.')
    }

    mailRequest.expired = true
    await mailRequest.save()

    const security = await user.related('security').query()
      .where('method', 'otp')
      .first()

    if (!security) {
      return response.globalError('La 2FA n\'a pas été trouvé.')
    }
    await security.delete()

    return response.ok('')
  }

  // Appelé en GET suite à la redirection du mail, retourne le qrcode a afficher au joueur
  public async qrcode ({ response, params, auth }: HttpContextContract) {
    const token = params.token as string

    // replace with global helper??
    if (!token.match(/^[a-z0-9]+$/i) || token.length !== 32) {
      return response.globalError('La requête est incorrect.')
    }

    const mailRequest = await auth.user!.related('requests').query()
      .where('token', params.token)
      .where('user_id', auth.user!.id)
      .where('expired', 0)
      .where('created_at', '>', DateTime.local().minus({ minute: 30 }).toSQL())
      .firstOrFail()

    if (!mailRequest) {
      return response.globalError('La requête est incorrect.')
    }

    const otpauth = authenticator.keyuri(auth.user!.username, 'WizardMC', mailRequest.data)
    const imageUrl = await new Promise(resolve => {
      qrcode.toDataURL(otpauth, (err, imageURL) => {
        resolve(err ? null : imageURL)
      })
    })

    if (!imageUrl) {
      return response.globalError('Une erreur est survenue pendant la génération du QRCode')
    }

    return response.send({ qrcode: imageUrl })
  }

  // Appelé en POST avec comme argument 'code' qui contient le code entré par l'utilisateur
  public async store ({ request, response, auth, params }: HttpContextContract) {
    const token = params.token as string

    // replace with global helper??
    if (!token.match(/^[a-z0-9]+$/i) || token.length !== 32) {
      return response.globalError('La requête est incorrect.')
    }

    const { code } = request.post()
    if (!code || !(/^\d+$/.test(code)) || code.length !== 6) {
      return response.globalError('La code indiqué n\'est pas dans le bon format')
    }

    const user = auth.user!
    const mailRequest = await auth.user!.related('requests').query()
      .where('token', params.token)
      .where('method', 'enable-otp')
      .where('user_id', auth.user!.id)
      .where('expired', 0)
      .where('created_at', '>', DateTime.local().minus({ minute: 30 }).toSQL())
      .firstOrFail()

    if (!mailRequest) {
      return response.globalError('La requête est incorrect.')
    }

    const currentToken = authenticator.generate(mailRequest.data)
    if (currentToken !== code) {
      return response.globalError('Le code indiqué est incorrect.')
    }

    const security = await user.related('security').query().first()
    if (security) {
      return response.globalError('La 2FA est déjà activée sur votre compte.')
    }

    mailRequest.expired = true
    await mailRequest.save()

    await user.related('security').create({ method: 'otp', secret: mailRequest.data })
    return response.globalSuccess('Le 2FA a bien été activé !')
  }
}
