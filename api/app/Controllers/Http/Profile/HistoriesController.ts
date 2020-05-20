import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class HistoriesController {
  public async index ({ response, auth, params, session }: HttpContextContract) {
    if (!auth.user || ['shop'].includes(params.type)) {
      return response.globalError('La page demandée n\'a pas été trouvée', 404)
    }

    let page = (params.page ?? 0)
    if (isNaN(page) || page < 1) {
      page = 1
    }
    page -= 1

    if (page === 0) {
      const currentValue = session.get(`history-${params.type}`)
      if (currentValue) {
        return currentValue
      }
    }

    let data: any[] = []
    switch (params.type) {
      case 'shop':
        data = await this.historyShop(auth.user.id, page)
        break
    }

    if (page === 0) {
      session.put(`history-${params.type}`, data)
    }

    return data
  }

  private async historyShop (user_id: number, page: number): Promise<any[]> {
    return await Database.from('shop_histories')
      .where('shop_histories.user_id', user_id)
      .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
      .limit(4)
      .offset(page)
      .orderBy('created_at', 'desc')
      .select('shop_offers.name', 'shop_histories.price', 'shop_histories.created_at')
  }
}
