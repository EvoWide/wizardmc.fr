import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'

export default class UsersController {
  public async current ({ auth, response, session }: HttpContextContract) {
    const offersSession = session.get('offers')
    if (offersSession) {
      return response.send({ user: auth.user, offers: offersSession })
    }

    const offers = (await Database
      .from('shop_histories')
      .where('user_id', auth.user!.id)
      .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
      .where((builder) => {
        builder.where('shop_offers.unique', true)
        builder.orWhere('shop_histories.version', Number(Env.get('SERVER_VERSION')))
      })
      .select('shop_offers.id'))
      .map(o => o.id)

    session.put('offers', offers)

    return response.send({ user: auth.user, offers })
  }

  public async store ({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    await User.create(data)

    await auth.attempt(data.username, data.password)

    return response.globalSuccess('Vous vous êtes inscrit avec succès.')
  }
}
