import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { randomString } from '@poppinss/utils'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import Item from 'App/Models/Vote/Reward'
import ServerService from 'App/Services/Server/ServerService'
import InventoryItem from 'App/Models/Vote/InventoryItem'
import RpgParadizeService from 'App/Services/RpgParadizeService'
import Reward from 'App/Models/Vote/Reward'

export default class VotesController {
  public async index ({ response }: HttpContextContract) {
    const rewards = await Reward.query()
      .orderBy('chance', 'asc')
      .orderBy('name', 'asc')
      .select('id', 'name', 'chance')

    return response.send(rewards)
  }

  public async initiate ({ request, response, session, auth }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return
    }

    const data = await this.getLastVote(user.id, request.ip())
    if (data) {
      // print timeleft
      return response.globalError('Vous avez déjà voté il y a moins de 3 heures !')
    }

    const token = randomString(16)
    session.put('vote-token', token)

    return response.send(token)
  }

  public async confirm ({ request, response, session, auth }: HttpContextContract) {
    const { out, token } = request.post()

    if (!token || !out || isNaN(out)) {
      return response.globalError('La requête est invalide.')
    }

    const currentToken = session.get('vote-token')
    if (currentToken !== token) {
      return response.globalError('Une erreur est survenue, veuillez raffraichir la page.')
    }

    if (!auth.user || Math.abs(Number(out) - RpgParadizeService.getOut()) >= 3) {
      return response.globalError('La valeur out est incorrect.')
    }

    await Database.insertQuery().table('vote_histories').insert({
      user_id: auth.user?.id,
      ip: request.ip(),
    })

    session.forget('vote-token')
    const reward = await this.getRandomReward()
    if (!reward) {
      return response.globalError('Aucune récompense n\'a été trouvée.')
    }

    if (reward.credits > 0) {
      auth.user.credits += reward.credits
      auth.user.save()
    }

    if (reward.commands) {
      if (ServerService.isOnline(auth.user.username)) {
        ServerService.execute(reward.commands.replace(/{playerName}/g, auth.user.username))
      } else {
        await InventoryItem.create({
          userId: auth.user.id,
          itemId: reward.id,
        })
      }
    }

    return response.globalSuccess(`Vous avez gagné : ${reward.name}`, { reward })
  }

  private async getRandomReward () {
    const voteItems = await Item.all()
    const totalChance = voteItems.map(item => item.chance).reduce((o1, o2) => o1 + o2)
    const rand = Math.floor((Math.random() * totalChance) + 1)

    let i = 0
    return voteItems.find(item => {
      if (rand <= (i += item.chance)) {
        return item
      }
    })
  }

  private async getLastVote (user_id: number, ip: string) {
    return await Database.from('vote_histories')
      .where(builder => {
        builder.where('user_id', user_id)
        builder.orWhere('ip', ip)
      })
      .where('created_at', '>', this.convertDate(DateTime.local().minus({ hour: 3 }).toISO()))
      .orderBy('created_at', 'desc')
      .first()
  }

  private convertDate (date: string) {
    date = date.replace('T', ' ')
    date = date.substring(0, date.length - 5)
    return date
  }
}
