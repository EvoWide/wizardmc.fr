import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PromotionalCode from 'App/Models/PromotionalCode'

export default class PromotionalCodesController {
  public async view ({ response, params }: HttpContextContract) {
    const promotionalCode = await PromotionalCode.query()
      .where('code', params.code.toLowerCase())
      .firstOrFail()

    if (promotionalCode.isExpired()) {
      return response.globalError('Le code promotionnel a expiré')
    }

    return response.json({
      code: promotionalCode.code,
      reduction: promotionalCode.reduction,
    })
  }
}
