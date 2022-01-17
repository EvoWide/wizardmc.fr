/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import CacheService from 'App/Services/CacheService'
import Database from '@ioc:Adonis/Lucid/Database'
import { slugify } from 'App/helpers'

export default class LauncherController {
  public async index() {
    return await CacheService.remember(
      'launcher-info',
      async () => {
        return {
          post: await this.getLastPost(),
          shop: await this.getMostBoughtOffers(3),
        }
      },
      '1h'
    )
  }

  private async getLastPost() {
    const queryResult = await Database.from('posts')
      .select('id', 'image', 'title')
      .where('hidden', false)
      .orderBy('id', 'desc')
      .first()

    if (!queryResult) {
      return {}
    }

    queryResult.url = `https://wizardmc.fr/news/${queryResult.id}-${slugify(queryResult.title)}`
    delete queryResult.id

    return queryResult
  }

  private async getMostBoughtOffers(limit: number) {
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
