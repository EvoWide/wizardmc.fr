// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Dedipass from 'App/Services/Payment/Dedipass'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PaymentsController {
  public async rates () {
    const dedipassRates = await CacheService.remember('dedipass-rates', async () => {
      return await Dedipass.getRates()
    }, '1h')

    return {
      dedipass: dedipassRates,
      paypal: await Database.from('payment_prices')
        .where('method', 'paypal')
        .select('price', 'credits'),
    }
  }
}
