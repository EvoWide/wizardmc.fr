/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class Visit {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (!ctx.session.get('hasVisited')) {
      ctx.session.put('hasVisited', true)

      const date = DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      await Database.from('statistics')
        .where('type_id', 0)
        .where('created_at', date.toSQL())
        .increment('count', 1)
    }
    await next()
  }
}
