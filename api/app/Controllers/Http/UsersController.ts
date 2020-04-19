import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import Recaptcha from 'App/Services/Recaptcha'
import LoginValidator from 'App/Validators/User/LoginValidator'


export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    
    return response.send(user)
  }

  public async authenticate({ request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    if (!(await Recaptcha.verify(data.recaptcha))) {
      return response.status(422).send([{field: null, 'message': 'Une erreur est survenue pendant la vérification du ReCaptcha'}])
    }

    await Recaptcha.verify(data.recaptcha)
  }


}
