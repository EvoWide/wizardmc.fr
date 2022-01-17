/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Dedipass from 'App/Services/Payment/Dedipass'
import Database from '@ioc:Adonis/Lucid/Database'
import Paysafecard from 'App/Services/Payment/Paysafecard'
import Stripe from 'App/Services/Payment/Stripe'

export default class PaymentsController {
  public async rates({ response }: HttpContextContract) {
    const [dedipass, paypal, paysafecard, stripe] = await CacheService.remember(
      'payments-rates',
      async () => {
        return Promise.all([
          await Dedipass.getRates(),
          await Database.from('payment_prices')
            .where('method', 'paypal')
            .select('price', 'credits')
            .orderBy('price', 'asc'),
          await Database.from('payment_prices')
            .where('method', 'paysafecard')
            .select('price', 'credits')
            .orderBy('price', 'asc'),
          await Stripe.getProducts(),
        ])
      },
      '1h'
    )

    return response.send({
      dedipass,
      paypal,
      paysafecard,
      stripe,
    })
  }

  public async dedipass({ request, auth, response }: HttpContextContract) {
    const { code } = request.post()
    if (!code || !code.match(/^[a-z0-9]+$/i)) {
      return response.globalError('Le code est dans un format incorrect.')
    }

    const dedipassValidation = await Dedipass.validate(code)
    if (!dedipassValidation || dedipassValidation.status !== 'success') {
      return response.globalError('Le code entré est incorrect.')
    }

    const credits = dedipassValidation.virtual_currency ?? 0
    if (credits) {
      auth.user!.credits += Number(credits)
      await auth.user!.save()
    }

    const rate = await Dedipass.getRate(dedipassValidation.rate)

    await Database.insertQuery()
      .table('user_payments')
      .insert({
        user_id: auth.user!.id,
        method: 'dedipass',
        price: rate.user_price ?? 0,
        currency: rate.user_currency ?? 'EUR',
        payout: dedipassValidation.payout,
        credits: credits,
        data: JSON.stringify({ code: code }),
      })
    return response.globalSuccess(`Les ${credits} crédits ont bien été ajoutés à votre compte !`)
  }

  public async paysafecard({ request, response, auth }: HttpContextContract) {
    const { price } = request.post()
    if (!price || isNaN(price)) {
      return response.globalError('Le prix est incorrect.')
    }

    const priceRow = await Database.from('payment_prices')
      .where('price', price)
      .where('method', 'paysafecard')
      .first()

    if (!priceRow) {
      return response.globalError('Le prix est incorrect.')
    }

    let payment
    try {
      payment = await Paysafecard.initiate(priceRow.price, {
        id: auth.user!.uuid,
        ip: request.ip(),
      })
    } catch (e) {
      return response.globalError(
        "La transaction n'a pas pu être lancée en raison de problèmes de connexion."
      )
    }

    await Database.insertQuery().table('payment_paysafecards').insert({
      token: payment.id,
      user_id: auth.user?.id,
      price: payment.amount,
    })
    return response.send({ redirect: payment.redirect.auth_url })
  }

  public async paysafecardSuccess({ response, params }: HttpContextContract) {
    if (!(await Paysafecard.validate(params.paymentId))) {
      return
    }
    return response.globalSuccess('Les crédits ont bien été ajoutés à votre compte !')
  }
}
