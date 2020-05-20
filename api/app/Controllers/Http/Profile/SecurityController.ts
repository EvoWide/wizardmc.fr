import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { authenticator, totp } from 'otplib'
import qrcode from 'qrcode'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import uuid from '@lukeed/uuid'
import CacheService from 'App/Services/CacheService'

export default class SecurityController {
  // Appelé en get sans argument
  public async enable ({ request, response, auth }: HttpContextContract) {
    const user = auth.user!
    const security = await user.related('security').query().first()
    if (security) {
      return response.globalError('La 2FA est déjà activée sur votre compte.')
    }

    const token = uuid().replace(/-/g, '')
    const origin = request.headers().origin as string

    const url = Route.makeSignedUrl('enableSecurity', {
      params: {
        token: token,
      },
      expiresIn: '30m',
    })

    const data = {
      token: token,
      secret: authenticator.generateSecret(),
    }
    CacheService.put(`security-${user.id}-otp`, data, '30m')

    // TODO Changer le mail
    await Mail.send((message) => {
      message.to(user.email)
        .from('noreply@wizardmc.fr', 'WizardMC')
        .subject('WizardMC - Activation de la double authentification')
        .htmlView('emails/reset_password', { url: origin + url, user })
    })

    return response.globalSuccess('Un mail a été envoyé')
  }

  // Appelé en GET suite à la redirection du mail, retourne le qrcode a afficher au joueur
  public async qrcode ({ request, response, params, auth }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.unauthorized('')
    }

    const data = CacheService.get(`security-${auth.user!.id}-otp`)
    if (!data || data.token !== params.token) {
      return response.globalError('La requête est incorrect.')
    }

    const otpauth = authenticator.keyuri(auth.user!.username, 'WizardMC', data.secret)
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
    if (!request.hasValidSignature()) {
      return
    }

    const { code } = request.post()
    if (!code || !(/^\d+$/.test(code)) || code.length !== 6) {
      return response.globalError('La code indiqué n\'est pas dans le bon format')
    }

    const user = auth.user!
    const data = CacheService.get(`security-${user.id}-otp`)
    if (!data || data.token !== params.token) {
      return response.globalError('La requête est incorrect.')
    }

    const currentToken = authenticator.generate(data.secret)
    if (currentToken !== code) {
      return response.globalError('Le code indiqué est incorrect.')
    }

    const security = await user.related('security').query().first()
    if (security) {
      return response.globalError('La 2FA est déjà activée sur votre compte.')
    }

    CacheService.remove(`security-${user.id}-otp`)

    await user.related('security').create({ method: 'otp', secret: data.secret })
    return response.globalSuccess('Le 2FA a bien été activé !')
  }
}
