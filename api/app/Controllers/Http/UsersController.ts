import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'

export default class UsersController {
  public current ({ auth }: HttpContextContract) {
    return auth.user
  }

  public async store ({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)

    await auth.attempt(data.username, data.password)

    return response.send(user)
  }
}
