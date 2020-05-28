import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { Stripe as stripe } from 'stripe'

class Stripe {
  constructor (
    private privateKey = Env.get('PAYMENT_STRIPE_PRIVATE_KEY') as string,
    private webhook = Env.get('PAYMENT_STRIPE_WEBHOOK') as string
  ) { }

  public async validate (request: RequestContract, response: ResponseContract) {
    const stripeInstance = new stripe(this.privateKey, {
      apiVersion: '2020-03-02',
      typescript: true,
    })

    const sig = request.headers()['stripe-signature'] as string

    let event
    try {
      event = stripeInstance.webhooks.constructEvent(request.raw() ?? '', sig, this.webhook)
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type !== 'checkout.session.completed') {
      return
    }

    const session = event.data.object
    const intent = await stripeInstance.paymentIntents.retrieve(session.payment_intent)

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

export default new Stripe()
