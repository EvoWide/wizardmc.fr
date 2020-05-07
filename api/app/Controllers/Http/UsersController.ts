import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import LoginValidator from 'App/Validators/User/LoginValidator'


export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    
    return response.send(user)
  }

  public async authenticate({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    await auth.attempt(data.username, data.password, !!request.post().remember)
    response.send({ success: true })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    response.send({ success: true })
  }
  
}
