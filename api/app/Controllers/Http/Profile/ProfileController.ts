import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UserSecurity from 'App/Models/UserSecurity'

export default class ProfileController {
  public async index ({ auth, response }: HttpContextContract) {
    const [rewards, security] = await Promise.all([
      await Database.from('vote_inventory')
        .where('user_id', auth.user!.id)
        .innerJoin('vote_rewards', 'vote_rewards.id', 'vote_inventory.item_id')
        .orderBy('vote_inventory.created_at', 'desc')
        .select('vote_inventory.id', 'vote_rewards.name'),
      await UserSecurity.query()
        .where('user_id', auth.user!.id)
        .select('id', 'method')
        .first(),
    ])
    return response.json({ rewards, security })
  }
}
