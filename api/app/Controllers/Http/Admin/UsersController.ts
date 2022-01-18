/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserSecurity from 'App/Models/UserSecurity'
import UserValidator from 'App/Validators/Admin/UserValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const search = request.input('search', '')
    const sort = request.input('sort', 'created_at desc')

    return await User.query()
      .where((query) => {
        if (search) {
          query.where('email', 'LIKE', `%${search}%`)
          query.orWhere('username', 'LIKE', `%${search}%`)
        }
      })
      .orderByRaw(sort)
      .paginate(page, 8)
  }

  public async show({ params, response }: HttpContextContract) {
    const [user, security, shop, payments] = await Promise.all([
      await User.query().where('id', params.id).first(),
      await UserSecurity.query().where('user_id', params.id).select('id', 'method').first(),
      await Database.from('shop_histories')
        .where('shop_histories.user_id', params.id)
        .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
        .orderBy('shop_histories.created_at', 'desc')
        .select('shop_offers.name', 'shop_histories.price', 'shop_histories.created_at'),
      await Database.from('user_payments')
        .where('user_id', params.id)
        .orderBy('created_at', 'desc')
        .select('method', 'price', 'currency', 'credits', 'created_at'),
    ])

    return response.json({ user, security, histories: { shop, payments } })
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    await User.query().where('id', params.id).update(data)

    return 'Utilisateur modifié!'
  }
}
