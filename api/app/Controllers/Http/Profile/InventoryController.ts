/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InventoryItem from 'App/Models/Vote/InventoryItem'
import ServerService from 'App/Services/Server/ServerService'
import Reward from 'App/Models/Vote/Reward'

export default class InventoryController {
  public async redeem({ response, params, auth }: HttpContextContract) {
    const inventoryItem = await InventoryItem.query()
      .where('user_id', (<any>auth.user).id)
      .where('id', params.id)
      .firstOrFail()

    if (!ServerService.isOnline((<any>auth.user).username)) {
      return response.unauthorized(
        'Vous devez être connecté sur le serveur pour récupérer votre récompense'
      )
    }

    await inventoryItem.delete()
    const reward = await Reward.query().where('id', inventoryItem.itemId).firstOrFail()

    ServerService.execute(reward.commands.replace(/{playerName}/g, (<any>auth.user).username))
    return response.ok('')
  }
}
