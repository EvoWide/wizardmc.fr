import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Shop/Category'
import Offer from 'App/Models/Shop/Offer'

export default class ShopsController {
  public async index ({ response }: HttpContextContract) {
    const offers = await Category.query().select('id', 'name').preload('offers', (builder) => {
      builder.select('id', 'name', 'image', 'price')
    })

    response.send(offers)
  }

  public async view ({ response, params }: HttpContextContract) {
    const offer = await Offer.query()
      .where('id', params.id)
      .select('id', 'name', 'image', 'description', 'price')
      .firstOrFail()

    response.send(offer)
  }
}
