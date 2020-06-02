import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index ({ request }: HttpContextContract) {
    const page = Number(request.input('page', 1))
    const search = request.input('search', '')
    const sort = request.input('sort', 'created_at desc')

    return await User.query()
      .where(query => {
        if (search) {
          query.where('email', 'LIKE', `%${search}%`)
          query.orWhere('username', 'LIKE', `%${search}%`)
        }
      })
      .orderByRaw(sort)
      .paginate(page, 8)
  }
}
