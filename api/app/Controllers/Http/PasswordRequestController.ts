import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import uuid from '@lukeed/uuid'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class PasswordRequestController {
  private readonly DAILY_MAIL_LIMIT = 6

  public async store ({ request, response }: HttpContextContract) {
    const { email } = await validator.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email(),
        ]),
      }),
      data: request.post(),
    })
    const user = await User.query().where('email', email).firstOrFail()

    const res = await Database.query()
      .count('id as count')
      .from('password_requests')
      .where('user_id', user.id)
      .orWhere('adress', request.ip())

    const requestToday = res[0]['count'] ?? 0
    if (requestToday >= this.DAILY_MAIL_LIMIT) {
      return response.globalError('Vous avez atteint la maximum quotidienne.')
    }

    const token = uuid().replace(/-/g, '')
    await Database.insertQuery()
      .table('password_requests')
      .insert({
        user_id: user.id,
        token: token,
        adress: request.ip(),
      })

    const url = Route.makeSignedUrl('passwordRequest', {
      params: {
        token: token,
      },
      expiresIn: '6h',
    })

    return response.send({ success: true, url: url })
  }

  public async update ({ request, response, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.globalError('La requête est incorrect.')
    }

    const { password } = await validator.validate({
      schema: schema.create({
        password: schema.string({}, [
          rules.minLength(5),
        ]),
      }),
      data: request.post(),
    })

    const passwordRequest = await Database.query()
      .select('*')
      .from('password_requests')
      .where('token', params['token'])
      .first()

    if (!passwordRequest) {
      return response.globalError('La requête est incorrect.')
    }

    const user = await User.query().where('id', passwordRequest.user_id).firstOrFail()
    user.password = password
    await user.save()

    await Database.query().from('password_requests').where('id', passwordRequest.id).delete()

    return response.globalSuccess('Le mot de passe a bien été modifié')
  }
}
