import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/User/LoginValidator'

export default class SessionsController {
  public async store ({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    await auth.attempt(data.username, data.password, !!request.post().remember)

    return response.globalSuccess('Vous vous êtes connecté avec succès.')
  }

  public async destroy ({ response, auth }: HttpContextContract) {
    await auth.logout()

    return response.globalSuccess('Vous vous êtes déconnecté avec succès.')
  }
}
