import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class HistoriesController {
  public async purchases ({ request, response }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const search = request.input('search', '')
    const sort = request.input('sort', 'created_at desc')

    return await Database.from('shop_histories')
      .innerJoin('users', 'users.id', 'shop_histories.user_id')
      .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
      .whereRaw('')
      .where(query => {
        if (search) {
          query.where('shop_offers.name', 'LIKE', `%${search}%`)
          query.orWhere('users.username', 'LIKE', `%${search}%`)
        }
      })
      .select(
        'shop_histories.id',
        'shop_histories.user_id',
        'offer_id',
        'shop_offers.name',
        'shop_histories.price',
        'username as user',
        'shop_histories.created_at'
      )
      .orderByRaw(sort)
      .paginate(page, 8)
  }
}
