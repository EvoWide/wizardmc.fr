import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/User/LoginValidator'

export default class SessionsController {
  public async store ({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    await auth.attempt(data.username, data.password, !!request.post().remember)

    return response.globalSuccess('Vous vous êtes connecté avec succès.')
  }

  public async destroy ({ auth, response, session }: HttpContextContract) {
    await auth.logout()

    // Remove bought Shop offers
    session.forget('offers')

    return response.globalSuccess('Vous vous êtes déconnecté avec succès.')
  }
}
