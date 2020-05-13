import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { randomString } from '@poppinss/utils'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime, Duration } from 'luxon'
import sessionConfig from 'config/session'
import Item from 'App/Models/Vote/Item'
import VoteItems from 'database/migrations/1589376378530_vote_items'

export default class VotesController {
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

    return response.send({ success: true })
  }

  public async check ({ request, response, session, auth }: HttpContextContract) {
    const { out, token } = request.post()
    if (!token || !token || !out || isNaN(out)) {
      return response.globalError('La valeur out est incorrect.')
    }

    const currentToken = session.get('vote-token')
    if (!currentToken || currentToken !== token) {
      return response.globalError('Une erreur est survenue, veuillez raffraichir la page.')
    }

    session.forget('vote-token')

    return response.globalSuccess('La ré')
  }

  private async getRandomReward () {
    const voteItems = await Item.all()
    const totalChance = voteItems.map(item => item.chance).reduce((o1, o2) => o1 + o2)
    const rand = Math.floor((Math.random() * totalChance) + 1)

    let i = 0
    let currentItem

    voteItems.some(item => {
      if (rand <= i) {
        currentItem = item
        return true
      }
      return currentItem !== null
    })

    return currentItem
  }

  private async getLastVote (user_id: number, ip: string) {
    return await Database.from('vote_histories')
      .where(builder => {
        builder.where('user_id', user_id)
        builder.orWhere('ip', ip)
      })
      .where('created_at', '>', DateTime.local().minus({ hour: 3 }).toSQLDate())
      .orderBy('created_at', 'desc')
      .first()
  }
}
