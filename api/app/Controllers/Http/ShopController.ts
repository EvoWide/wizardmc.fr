import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Shop/Category'
import Offer from 'App/Models/Shop/Offer'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class ShopsController {
  public async index ({ response }: HttpContextContract) {
    const categories = await Category.query().select('id', 'name').preload('offers', (builder) => {
      builder.select('id', 'name', 'image', 'price')
    })

    response.send(categories)
  }

  public async show ({ response, params }: HttpContextContract) {
    const offer = await Offer.query()
      .where('id', params.id)
      .select('id', 'name', 'image', 'description', 'price')
      .firstOrFail()

    response.send(offer)
  }

  public async buy ({ params, response, auth }: HttpContextContract) {
    const offer = await Offer.query().where('id', params.id).firstOrFail()
    const { user } = auth

    if (!user) {
      return
    }

    if (offer.price > user.credits) {
      return response.globalError(`Il vous manque ${offer.price - user.credits} crédit(s) pour effectuer cet achat.`)
    }

    if (offer.deps && !(await this.hasBuy(user, offer.deps))) {
      return response.globalError('Vous ne remplissez pas toutes les conditions pour pouvoir effectuer cet achat.')
    }

    if (offer.unique && (await this.hasBuy(user, offer.id))) {
      return response.globalError('Vous ne remplissez pas toutes les conditions pour pouvoir effectuer cet achat.')
    }

    user.credits -= offer.price
    await user.save()

    await Database.insertQuery()
      .table('shop_histories')
      .insert({ user_id: user.id, offer_id: offer.id, price: offer.price })

    return response.globalSuccess('L\'achat a bien été effectué.')
  }

  private async hasBuy (user: User, offer_id: number) {
    return (await Database.from('shop_histories')
      .where('user_id', user.id)
      .where('offer_id', offer_id)
      .limit(1)).length > 0
  }
}
