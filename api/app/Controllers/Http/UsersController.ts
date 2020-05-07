import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import LoginValidator from 'App/Validators/User/LoginValidator'
import Hash from '@ioc:Adonis/Core/Hash'


export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    
    return response.send(user)
  }

  public async authenticate({ request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator)
    const user = await User.query().where('username', data.username).first()

    if (!user || !Hash.verify(user.password, data.password)) {
      return response.json({error: 'Bad combinaison'})
    }

    // Logged as user
  }
  
}
