/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { randomString } from 'App/helpers'
import { DateTime } from 'luxon'
import ms from 'ms'
import PromotionalCode from 'App/Models/PromotionalCode'

export default class PromotionalCodesController {
  public async store({ request, response }: HttpContextContract) {
    let { code, reduction, duration } = await request.validate({
      schema: schema.create({
        code: schema.string(),
        reduction: schema.number(),
        duration: schema.string(),
      }),
    })

    const expireAt = DateTime.local().plus(ms(duration))
    const quantity = request.input('quantity', 1)

    if (code === 'random') {
      code = randomString(8)
    }

    if (reduction < 0 || reduction >= 100) {
      return response.abort('La réduction doit être > 0 & < 100')
    }

    const promotionalCode = await PromotionalCode.create({ code, quantity, reduction, expireAt })
    return response.send({ code: promotionalCode.code })
  }
}
