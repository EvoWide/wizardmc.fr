/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  /**
   * Fields to give: player
   * @param ctx
   */
  public async balance({ request, response }: HttpContextContract) {
    const { player } = await request.validate({
      schema: schema.create({
        player: schema.string(),
      }),
    })

    const user = await this.findByIdOrUUID(player)
    return response.send({ success: true, balance: user.credits })
  }

  /**
   * Fields to give: player, credits
   * @param ctx
   */
  public async withdraw({ request, response }: HttpContextContract) {
    const { player, credits } = await request.validate({
      schema: schema.create({
        player: schema.string(),
        credits: schema.number(),
      }),
    })

    const user = await this.findByIdOrUUID(player)
    if (user.credits < credits) {
      return response.status(403).send({ error: 'Not enough credits' })
    }

    user.credits -= credits
    await user.save()

    return response.send({ success: true, balance: user.credits })
  }

  /**
   * Fields to give: player, credits
   * @param ctx
   */
  public async deposit({ request, response }: HttpContextContract) {
    const { player, credits } = await request.validate({
      schema: schema.create({
        player: schema.string(),
        credits: schema.number(),
      }),
    })

    const user = await this.findByIdOrUUID(player)
    user.credits += credits
    await user.save()

    return response.send({ 'success': true, 'user.username': user.credits })
  }

  /**
   * Fields to give: player, target, credits
   * @param ctx
   */
  public async transfer({ request, response }: HttpContextContract) {
    const { player, target, credits } = await request.validate({
      schema: schema.create({
        player: schema.string(),
        target: schema.string(),
        credits: schema.number(),
      }),
    })

    const user = await this.findByIdOrUUID(player)
    const userTarget = await this.findByIdOrUUID(target)

    if (user.uuid !== userTarget.uuid) {
      if (user.credits < credits) {
        return response.status(403).send({ error: 'Not enough credits' })
      }

      user.credits -= credits
      await user.save()

      userTarget.credits += credits
      await userTarget.save()
    }

    return response.send({ success: true, player: user.credits, target: userTarget.credits })
  }

  private async findByIdOrUUID(idOrUuid: string): Promise<User> {
    return await User.query()
      .select('id', 'credits', 'username')
      .where('username', idOrUuid)
      .orWhere('uuid', idOrUuid)
      .firstOrFail()
  }
}
