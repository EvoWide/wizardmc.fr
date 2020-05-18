import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index ({response}: HttpContextContract) {
    const users = await User.all()

    return response.json(users)
  }
}
