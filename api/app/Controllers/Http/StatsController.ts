/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Database from '@ioc:Adonis/Lucid/Database'
import ServerService from 'App/Services/Server/ServerService'

export default class StatsController {
  public async index({ response }: HttpContextContract) {
    const [registered, visits, maxPlayers] = await CacheService.remember(
      'stats',
      async () => {
        return Promise.all([
          await Database.from('users').count('id as count').first(),
          await Database.from('statistics').where('type_id', 0).sum('count as count').first(),
          await Database.from('statistics').where('type_id', 1).max('count as max').first(),
        ])
      },
      '5m'
    )

    return response.send({
      registered: registered.count,
      players: ServerService.getPlayersCount(),
      visits: visits.count ?? 0,
      maxPlayers: Math.max(maxPlayers.max ?? 0, ServerService.getMaxPlayers()),
    })
  }
}
