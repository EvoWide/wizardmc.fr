import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // Fields: player
  public async balance ({ request, response }: HttpContextContract) {
    const user = await this.findByIdOrUUID(request.post().player)
    return response.send({ success: true, balance: user.credits })
  }

  // Fields player, credits
  public async withdraw ({ request, response }: HttpContextContract) {
    const { credits } = request.post()
    const user = await this.findByIdOrUUID(request.post().player)

    if (user.credits < credits) {
      return response.status(403).send({ error: 'Not enough credits' })
    }

    user.credits -= credits
    user.save()

    return response.send({ success: true, balance: user.credits })
  }

  // Fields player, credits
  public async deposit ({ request, response }: HttpContextContract) {
    const { credits } = request.post()
    const user = await this.findByIdOrUUID(request.post().player)

    user.credits += credits
    user.save()

    return response.send({ success: true, 'user.username': user.credits })
  }

  // Fields: player, target, credits
  public async transfer ({ request, response }: HttpContextContract) {
    const { credits } = request.post()
    const player = await this.findByIdOrUUID(request.post().player)
    const target = await this.findByIdOrUUID(request.post().target)

    if (player.credits < credits) {
      return response.status(403).send({ error: 'Not enough credits' })
    }

    player.credits -= credits
    await player.save()

    target.credits += credits
    await target.save()

    return response.send({ success: true, player: player.credits, target: target.credits })
  }

  private async findByIdOrUUID (idOrUuid: string): Promise<User> {
    return await User.query()
      .select('credits', 'username')
      .where('username', idOrUuid)
      .orWhere('uuid', idOrUuid)
      .firstOrFail()
  }
}
