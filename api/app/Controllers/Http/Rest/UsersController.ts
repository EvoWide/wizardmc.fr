import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // Fields: player
  public async balance ({ request, response }: HttpContextContract) {
    const { player } = request.post()
    if (!player) {
      return response.status(400).json({ message: 'Invalid request' })
    }

    const user = await this.findByIdOrUUID(player)
    return response.send({ success: true, balance: user.credits })
  }

  // Fields player, credits
  public async withdraw ({ request, response }: HttpContextContract) {
    const { player, credits } = request.post()
    if (!player || !credits || isNaN(credits)) {
      return response.status(400).json({ message: 'Invalid request' })
    }

    const user = await this.findByIdOrUUID(player)
    if (user.credits < credits) {
      return response.status(403).send({ error: 'Not enough credits' })
    }

    user.credits -= credits
    await user.save()

    return response.send({ success: true, balance: user.credits })
  }

  // Fields player, credits
  public async deposit ({ request, response }: HttpContextContract) {
    const { player, credits } = request.post()
    if (!player || !credits || isNaN(credits)) {
      return response.status(400).json({ message: 'Invalid request' })
    }

    const user = await this.findByIdOrUUID(player)
    user.credits += credits
    await user.save()

    return response.send({ success: true, 'user.username': user.credits })
  }

  // Fields: player, target, credits
  public async transfer ({ request, response }: HttpContextContract) {
    const { player, target, credits } = request.post()
    if (!player || !target || !credits || isNaN(credits)) {
      return response.status(400).json({ message: 'Invalid request' })
    }

    const user = await this.findByIdOrUUID(player)
    const userTarget = await this.findByIdOrUUID(target)

    if (user.credits < credits) {
      return response.status(403).send({ error: 'Not enough credits' })
    }

    user.credits -= credits
    await user.save()

    userTarget.credits += credits
    await userTarget.save()

    return response.send({ success: true, player: user.credits, target: userTarget.credits })
  }

  private async findByIdOrUUID (idOrUuid: string): Promise<User> {
    return await User.query()
      .select('credits', 'username')
      .where('username', idOrUuid)
      .orWhere('uuid', idOrUuid)
      .firstOrFail()
  }
}
