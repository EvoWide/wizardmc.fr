import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Database from '@ioc:Adonis/Lucid/Database'
import ServerService from 'App/Services/Server/ServerService'

export default class StatsController {
  public async index ({ response }: HttpContextContract) {
    // registered, players, visits, maxPlayers
    const [registered, visitsAndMaxPlayers] = await CacheService.remember('vote-ranking-rewards', async () => {
      return Promise.all([
        await Database.from('users').count('id as count'),
        await Database.from('statistics')
          .select('name', 'count'),
      ])
    }, '10m')

    const players = ServerService.getPlayersCount()

    return response.send({ registered, visitsAndMaxPlayers, players })
  }
}
