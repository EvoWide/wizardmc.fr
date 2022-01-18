/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user || !(<any>auth.user).isAdmin) {
      return false
    }

    await next()
  }
}
