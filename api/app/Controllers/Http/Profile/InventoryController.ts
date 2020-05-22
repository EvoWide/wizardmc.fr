import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import InventoryItem from 'App/Models/Vote/InventoryItem'
import ServerService from 'App/Services/Server/ServerService'
import Reward from 'App/Models/Vote/Reward'

export default class InventoryController {
  public async index ({ auth }: HttpContextContract) {
    return await Database.from('vote_inventory')
      .where('user_id', auth.user!.id)
      .innerJoin('vote_rewards', 'vote_rewards.id', 'vote_inventory.item_id')
      .orderBy('vote_inventory.created_at', 'desc')
      .select('vote_inventory.id', 'vote_rewards.name')
  }

  public async redeem ({ response, params, auth }: HttpContextContract) {
    const inventoryItem = await InventoryItem.query()
      .where('user_id', auth.user!.id)
      .where('id', params.id)
      .firstOrFail()

    if (!ServerService.isOnline(auth.user!.username)) {
      return response.globalError('Vous devez être connecté sur le serveur pour récupérer votre récompense')
    }

    await inventoryItem.delete()
    const reward = await Reward.query().where('id', inventoryItem.itemId).firstOrFail()

    ServerService.execute(reward.commands.replace(/{playerName}/g, auth.user!.username))
    return response.ok('')
  }
}
