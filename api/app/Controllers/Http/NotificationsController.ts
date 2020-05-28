import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Paypal from 'App/Services/Payment/Paypal'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Paysafecard from 'App/Services/Payment/Paysafecard'
import Stripe from 'stripe'

export default class NotificationsController {
  public async paypal ({ request }: HttpContextContract) {
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

    await Database
      .insertQuery()
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

  public async paysafecard ({ params }: HttpContextContract) {
    return await Paysafecard.validate(params.paymentId)
  }

  public async stripe ({ request, response }: HttpContextContract) {
    const stripe = new Stripe(Env.get('PAYMENT_STRIPE_PRIVATE_KEY') as string, {
      apiVersion: '2020-03-02',
      typescript: true,
    })

    const sig = request.headers()['stripe-signature'] as string

    let event
    try {
      event = stripe.webhooks.constructEvent(request.raw() ?? '', sig, Env.get('PAYMENT_STRIPE_WEBHOOK') as string)
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type !== 'checkout.session.completed') {
      return
    }

    const session = event.data.object
    const intent = await stripe.paymentIntents.retrieve(session.payment_intent)

    const paymentPrice = await Database.from('payment_prices')
      .where('price', intent.amount / 100)
      .where('method', 'stripe')
      .first()

    if (!paymentPrice) {
      return
    }

    const user = await User.findOrFail(Number(session.client_reference_id))
    user.credits += paymentPrice.credits
    await user.save()

    const fee = paymentPrice.price * 0.014 + 0.25

    await Database
      .insertQuery()
      .table('user_payments')
      .insert({
        user_id: user.id,
        method: 'stripe',
        price: paymentPrice.price,
        payout: paymentPrice.price - fee,
        credits: paymentPrice.credits,
      })
  }
}
