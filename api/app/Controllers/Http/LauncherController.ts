// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CacheService from 'App/Services/CacheService'
import Database from '@ioc:Adonis/Lucid/Database'
import { slugify } from 'App/helpers'

export default class LauncherController {
  public async index () {
    return await CacheService.remember('launcher-info', async () => {
      return {
        posts: await this.getRecentPosts(3),
        shop: await this.getMostBoughtOffers(3),
      }
    }, '1h')
  }

  private async getRecentPosts (limit: number) {
    const queryResult = await Database.from('posts')
      .select('id', 'image', 'title')
      .where('hidden', false)
      .orderBy('id', 'asc')
      .limit(limit)

    for (const result of queryResult) {
      result.url = `https://wizardmc.fr/news/${result.id}-${slugify(result.title)}`
      delete result.id
    }

    return queryResult
  }

  private async getMostBoughtOffers (limit: number) {
    const mostBoughtOffers = await Database.from('shop_histories')
      .countDistinct('id', 'count')
      .select('offer_id')
      .groupBy('offer_id')
      .orderBy('count', 'desc')
      .limit(limit)

    const offerIds = mostBoughtOffers.map((value) => {
      return value.offer_id
    })

    if (!offerIds) {
      return []
    }

    const queryResult = await Database.from('shop_offers')
      .select('image', 'id', 'price', 'name')
      .whereIn('id', offerIds)

    for (const result of queryResult) {
      result.url = `https://wizardmc.fr/shop?id=${result.id}`
      delete result.id
    }

    return queryResult
  }
}
