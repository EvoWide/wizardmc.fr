import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Shop/Category'

export default class ShopController {
  public async categories ({response}: HttpContextContract) {
    const categories = await Category.query().select('id', 'name')

    return response.send(categories)
  }
}
