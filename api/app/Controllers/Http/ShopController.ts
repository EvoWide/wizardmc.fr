import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Shop/Category'

export default class ShopsController {
  public async index ({ response }: HttpContextContract) {
    const offers = await Category.query().select('id', 'name').preload('offers', (builder) => {
      builder.select('id', 'name', 'description', 'image', 'price')
    })

    response.send(offers)
  }
}
