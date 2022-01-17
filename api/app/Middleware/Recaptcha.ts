/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RecaptchaService from 'App/Services/RecaptchaService'

export default class Recaptcha {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const recaptchaToken = ctx.request.post()['recaptcha']

    if (!recaptchaToken || !(await RecaptchaService.verify(recaptchaToken))) {
      return ctx.response.globalError(
        'Une erreur est survenue pendant la vérification du ReCaptcha'
      )
    }

    await next()
  }
}
