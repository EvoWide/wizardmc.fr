import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Visit {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    if (!ctx.session.get('hasVisited')) {
      ctx.session.put('hasVisited', true)
      await Database.from('statistics')
        .where('name', 'visits')
        .increment('count')
    }
    await next()
  }
}
