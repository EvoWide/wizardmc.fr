/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class HistoriesController {
  public async purchases({ request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const search = request.input('search', '')
    const sort = request.input('sort', 'shop_histories.created_at desc')

    return await Database.from('shop_histories')
      .innerJoin('users', 'users.id', 'shop_histories.user_id')
      .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
      .where((query) => {
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

  public async payments({ request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const search = request.input('search', '')
    const sort = request.input('sort', 'user_payments.created_at desc')

    return await Database.from('user_payments')
      .innerJoin('users', 'users.id', 'user_payments.user_id')
      .where((query) => {
        if (search) {
          query.where('method', 'LIKE', `%${search}%`)
          query.orWhere('username', 'LIKE', `%${search}%`)
        }
      })
      .select('user_payments.*', 'username as user')
      .orderByRaw(sort)
      .paginate(page, 8)
  }

  public async view({ params }: HttpContextContract) {
    return await Database.from('user_payments')
      .innerJoin('users', 'users.id', 'user_payments.user_id')
      .where('user_payments.id', params.id)
      .select('*', 'user_payments.credits as credits_purchased')
  }
}
