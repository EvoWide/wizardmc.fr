import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import uuid from '@lukeed/uuid'
import ms from 'ms'
import PromotionalCode from 'App/Models/PromotionalCode'

export default class PromotionalCodesController {
  public async store ({ request, response }: HttpContextContract) {
    let { code, reduction, duration } = await request.validate({
      schema: schema.create({
        code: schema.string(),
        reduction: schema.number(),
        duration: schema.string(),
      }),
    })

    const expireAt = ms(duration)
    const quantity = request.input('quantity', 1)

    if (code === 'random') {
      code = uuid().replace(/-/g, '').substr(0, 8)
    }

    if (reduction < 0 || reduction >= 100) {
      return response.globalError('La réduction doit être > 0 & < 100')
    }

    const promotionalCode = await PromotionalCode.create({ code: code, quantity: quantity, expireAt: expireAt })
    return response.send({ code: promotionalCode.code })
  }
}
