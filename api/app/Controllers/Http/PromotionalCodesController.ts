/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PromotionalCode from 'App/Models/PromotionalCode'

export default class PromotionalCodesController {
  public async view({ response, params }: HttpContextContract) {
    const promotionalCode = await PromotionalCode.query()
      .whereRaw('LOWER(code) LIKE ?', [params.code.toLowerCase()])
      .first()

    if (!promotionalCode) {
      return response.globalError("Le code promotionnel n'existe pas.")
    }

    if (promotionalCode.isExpired()) {
      return response.globalError('Le code promotionnel a expiré')
    }

    return response.json({
      code: promotionalCode.code,
      reduction: promotionalCode.reduction,
    })
  }
}
