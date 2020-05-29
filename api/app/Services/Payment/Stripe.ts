import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { Stripe as stripe } from 'stripe'
import { SessionContract } from '@ioc:Adonis/Addons/Session'
import CacheService from '../CacheService'

class Stripe {
  private _stripe: stripe

  constructor (
    private privateKey = Env.get('PAYMENT_STRIPE_PRIVATE_KEY') as string,
    private webhook = Env.get('PAYMENT_STRIPE_WEBHOOK') as string
  ) { }

  private get stripe (): stripe {
    if (!this._stripe) {
      this._stripe = new stripe(this.privateKey, {
        apiVersion: '2020-03-02',
        typescript: true,
      })
    }
    return this._stripe
  }

  public async getProducts () {
    return await CacheService.remember('stripe-products', async () => {
      const products = await this.stripe.products.list({ active: true })
      const returnedPrices: Object[] = []

      for (const product of products.data) {
        if (!product.metadata.credits) {
          continue
        }

        const prices = await this.stripe.prices.list({
          active: true,
          product: product.id,
          currency: 'eur',
          type: 'one_time',
          limit: 1,
        })

        if (prices.data.length === 0) {
          continue
        }

        const price = prices.data[0]
        if (!price) {
          continue
        }

        returnedPrices.push({
          id: price.id,
          price: price.unit_amount! / 100,
          currency: price.currency,
          credits: product.metadata.credits,
        })
      }

      return returnedPrices
    }, '1h')
  }

  public async validate (request: RequestContract, response: ResponseContract, adonisSession: SessionContract) {
    const sig = request.headers()['stripe-signature'] as string

    let event
    try {
      event = this.stripe.webhooks.constructEvent(request.raw() ?? '', sig, this.webhook)
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type !== 'checkout.session.completed') {
      return
    }

    const session: any = await this.stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ['payment_intent.charges.data.balance_transaction'],
    })

    if (session === null) {
      return
    }

    const fee = session.payment_intent.charges.data[0].balance_transaction.fee / 100
    const price = session.payment_intent.amount / 100
    const credits = Number(session.payment_intent.description.split(' ')[1]) ?? 0
    const payout = price - fee

    const user = await User.findOrFail(Number(session.client_reference_id))
    user.credits += credits
    await user.save()

    await Database
      .insertQuery()
      .table('user_payments')
      .insert({
        user_id: user.id,
        method: 'stripe',
        price: price,
        payout: payout,
        credits: credits,
      })

    adonisSession.forget('history-payments')
  }
}

export default new Stripe()
