import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Dedipass from 'App/Services/Payment/Dedipass'
import Database from '@ioc:Adonis/Lucid/Database'
import Paysafecard from 'App/Services/Payment/Paysafecard'

export default class PaymentsController {
  public async rates ({ response }: HttpContextContract) {
    const dedipassRates = await CacheService.remember('dedipass-rates', async () => {
      return await Dedipass.getRates()
    }, '1h')

    return response.send({
      dedipass: dedipassRates,
      paypal: await Database.from('payment_prices')
        .where('method', 'paypal')
        .select('price', 'credits'),
    })
  }

  public async dedipass ({ request, auth, response }: HttpContextContract) {
    const { code } = request.post()
    if (!code || !code.math(/^[a-z0-9]+$/i)) {
      return response.globalError('Le code est dans un format incorrect.')
    }

    const dedipassValidation = await Dedipass.validate(code)
    if (!dedipassValidation || dedipassValidation.status !== 'success') {
      return response.globalError('Le code entré est incorrect.')
    }

    const credits = dedipassValidation.virtual_currency ?? 0
    if (credits) {
      auth.user!.credits += credits
      await auth.user!.save
    }

    const price = await Dedipass.getPrice(dedipassValidation.rate)

    await Database
      .insertQuery()
      .table('user_payments')
      .insert({
        user_id: auth.user!.id,
        method: 'dedipass',
        price: price,
        payout: dedipassValidation.payout,
        credits: credits,
        data: JSON.stringify({ code: code }),
      })

    return response.globalSuccess(`Votre compte a bien été débité de ${credits} !`)
  }

  public async paysafecard ({ request, response, auth }: HttpContextContract) {
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
    } catch (ex) {
      return response
        .globalError('La transaction n\'a pas pu être lancée en raison de problèmes de connexion.')
    }

    await Database.insertQuery().table('payment_paysafecards').insert({
      token: payment.id,
      user_id: auth.user?.id,
      price: payment.amount,
    })
    return response.send({ redirect: payment.redirect.auth_url })
  }

  // TODO: Test this one with the front
  public async paysafecardSuccess ({ response, params }: HttpContextContract) {
    if (!(await Paysafecard.validate(params.paymentId))) {
      return
    }
    return response.globalSuccess('Les crédits ont bien été ajoutés à votre compte !')
  }
}
