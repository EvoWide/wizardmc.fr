/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paypal from 'App/Services/Payment/Paypal'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Paysafecard from 'App/Services/Payment/Paysafecard'
import Stripe from 'App/Services/Payment/Stripe'

export default class NotificationsController {
  public async paypal({ request }: HttpContextContract) {
    const data = request.post()
    if (!(await Paypal.verify(data))) {
      return
    }

    if (data.mc_currency !== 'EUR') {
      return
    }

    const paymentPrice = await Database.from('payment_prices')
      .where('price', data.mc_gross)
      .where('method', 'paypal')
      .first()

    if (!paymentPrice) {
      return
    }

    const user = await User.findOrFail(data.custom)
    user.credits += paymentPrice.credits
    await user.save()

    await Database.insertQuery()
      .table('user_payments')
      .insert({
        user_id: user.id,
        method: 'paypal',
        price: paymentPrice.price,
        payout: paymentPrice.price - data.mc_fee,
        credits: paymentPrice.credits,
        data: JSON.stringify(data),
      })
  }

  public async paysafecard({ params }: HttpContextContract) {
    return await Paysafecard.validate(params.paymentId)
  }

  public async stripe({ request, response }: HttpContextContract) {
    return await Stripe.validate(request, response)
  }
}
