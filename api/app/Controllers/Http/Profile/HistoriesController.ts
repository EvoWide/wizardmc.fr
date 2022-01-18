/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CacheService from 'App/Services/CacheService'

export default class HistoriesController {
  public async index({ response, auth, params }: HttpContextContract) {
    if (!['shop', 'payments'].includes(params.type)) {
      return response.notFound("La page demandée n'a pas été trouvée")
    }

    let page = params.page ?? 0
    if (isNaN(page) || page < 1) {
      page = 1
    }
    page -= 1

    const cacheKey = `user-${(<any>auth.user).id}-history-${params.type}`
    if (page === 0) {
      const currentValue = CacheService.get(cacheKey)
      if (currentValue) {
        return currentValue
      }
    }

    let data: any[] = []
    switch (params.type) {
      case 'shop':
        data = await this.historyShop((<any>auth.user).id, page)
        break
      case 'payments':
        data = await this.historyPayments((<any>auth.user).id, page)
        break
    }

    // Only cache first page of the histories
    if (page === 0) {
      CacheService.put(cacheKey, data, '30m')
    }

    return data
  }

  private async historyShop(user_id: number, page: number): Promise<any[]> {
    return await Database.from('shop_histories')
      .where('shop_histories.user_id', user_id)
      .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
      .limit(4)
      .offset(page * 4)
      .orderBy('shop_histories.created_at', 'desc')
      .select('shop_offers.name', 'shop_histories.price', 'shop_histories.created_at')
  }

  private async historyPayments(user_id: number, page: number): Promise<any[]> {
    return await Database.from('user_payments')
      .where('user_id', user_id)
      .limit(4)
      .offset(page * 4)
      .orderBy('created_at', 'desc')
      .select('method', 'price', 'currency', 'credits', 'created_at')
  }
}
