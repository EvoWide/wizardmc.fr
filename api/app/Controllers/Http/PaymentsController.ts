import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Dedipass from 'App/Services/Payment/Dedipass'
import Database from '@ioc:Adonis/Lucid/Database'

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

    await Database
      .insertQuery()
      .table('user_payments')
      .insert({
        user_id: auth.user!.id,
        method: 'dedipass',
        price: await Dedipass.getUserPrice(credits),
        credits: credits,
        data: JSON.stringify({ code: code }),
      })

    return response.globalSuccess(`Votre compte a bien été débité de ${credits} !`)
  }
}
