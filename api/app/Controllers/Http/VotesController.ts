/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { randomString } from 'App/helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import Item from 'App/Models/Vote/Reward'
import ServerService from 'App/Services/Server/ServerService'
import InventoryItem from 'App/Models/Vote/InventoryItem'
import RpgParadizeService from 'App/Services/RpgParadizeService'
import Reward from 'App/Models/Vote/Reward'
import CacheService from 'App/Services/CacheService'

export default class VotesController {
  public async index({ response }: HttpContextContract) {
    const [ranking, rewards] = await CacheService.remember(
      'vote-ranking-rewards',
      async () => {
        return Promise.all([
          await Database.query()
            .from('users')
            .orderBy('votes', 'desc')
            .select('username', 'votes')
            .limit(10),
          await Reward.query()
            .orderBy('chance', 'asc')
            .orderBy('name', 'asc')
            .select('id', 'name', 'chance'),
        ])
      },
      '10m'
    )

    return response.send({ rewards, ranking })
  }

  public async lastVote({ request, response, auth }: HttpContextContract) {
    const vote = await this.getLastVote((<any>auth.user).id, request.ip())
    return response.send(vote)
  }

  public async initiate({ request, response, session, auth }: HttpContextContract) {
    const data = await this.getLastVote((<any>auth.user).id, request.ip())
    if (data) {
      // TODO: print timeleft
      return response.abort('Vous avez déjà voté il y a moins de 3 heures !')
    }

    const token = randomString(16)
    session.put('vote-token', token)

    return response.send(token)
  }

  public async confirm({ request, response, session, auth }: HttpContextContract) {
    const { out, token } = request.post()
    const user = auth.user!

    if (!token || !out || isNaN(out)) {
      return response.abort('La requête est invalide.')
    }

    const currentToken = session.get('vote-token')
    if (currentToken !== token) {
      return response.abort('Une erreur est survenue, veuillez raffraichir la page.')
    }

    if (Math.abs(Number(out) - RpgParadizeService.getOut()) >= 3) {
      return response.abort('La valeur out est incorrect.')
    }

    await Database.insertQuery()
      .table('vote_histories')
      .insert({
        user_id: (<any>user).id,
        ip: request.ip(),
      })

    session.forget('vote-token')
    const reward = await this.getRandomReward()
    if (!reward) {
      return response.abort("Aucune récompense n'a été trouvée.")
    }

    ;(<any>user).votes++
    if (reward.credits > 0) {
      ;(<any>user).credits += reward.credits
    }
    ;(<any>user).save()

    if (reward.commands) {
      ServerService.execute('notifysite vote {playerName}')
      if (ServerService.isOnline((<any>user).username)) {
        ServerService.execute(reward.commands.replace(/{playerName}/g, (<any>user).username))
      } else {
        await InventoryItem.create({
          userId: (<any>user).id,
          itemId: reward.id,
        })
      }
    }

    // return response.globalSuccess(`Vous avez gagné : ${reward.name}`, { reward })
    return `Vous avez gagné : ${reward.name}`
  }

  private async getRandomReward() {
    const voteItems = await Item.all()
    const totalChance = voteItems.map((item) => item.chance).reduce((o1, o2) => o1 + o2)
    const rand = Math.floor(Math.random() * totalChance + 1)

    let i = 0
    return voteItems.find((item) => {
      if (rand <= (i += item.chance)) {
        return item
      }
    })
  }

  private async getLastVote(user_id: number, ip: string) {
    return await Database.from('vote_histories')
      .where((builder) => {
        builder.where('user_id', user_id)
        builder.orWhere('ip', ip)
      })
      .andWhere('created_at', '>', DateTime.local().minus({ hour: 3, second: 5 }).toSQL())
      .orderBy('created_at', 'desc')
      .first()
  }
}
