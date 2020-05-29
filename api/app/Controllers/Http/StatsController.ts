import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Database from '@ioc:Adonis/Lucid/Database'
import ServerService from 'App/Services/Server/ServerService'

export default class StatsController {
  public async index ({ response }: HttpContextContract) {
    const [registered, visitsAndMaxPlayers] = await CacheService.remember('stats', async () => {
      return Promise.all([
        await Database.from('users').count('id as count').first(),
        await Database.from('statistics')
          .select('name', 'count'),
      ])
    }, '5m')
    const players = ServerService.getPlayersCount()
    const visits = visitsAndMaxPlayers.find(x => x.name === 'visits').count
    const maxPlayers = visitsAndMaxPlayers.find(x => x.name === 'max_players').count

    return response.send({ registered: registered.count, players, visits, maxPlayers })
  }
}
