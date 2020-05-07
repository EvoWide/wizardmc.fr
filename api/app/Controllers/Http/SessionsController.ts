import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/User/LoginValidator'

export default class SessionsController {
  public async store ({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    await auth.attempt(data.username, data.password, !!request.post().remember)
    return response.send({ success: true })
  }

  public async destroy ({ response, auth }: HttpContextContract) {
    console.log('destroy')
    await auth.logout()

    return response.send({ success: true })
  }
}
