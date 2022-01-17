/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { BaseCommand } from '@adonisjs/ace'

export default class ResetPurchase extends BaseCommand {
  public static commandName = 'reset:purchases'
  public static description = 'Command to reset player purchases'

  public static settings = {
    loadApp: true,
  }

  public async handle() {
    const Database = (await import('@ioc:Adonis/Lucid/Database')).default

    const shopHistories = await Database.table('shop_histories')
    const redeemUserById = {}

    for (const row of shopHistories) {
      if (!(row.user_id in redeemUserById)) {
        redeemUserById[row.user_id] = 0
      }

      redeemUserById[row.user_id] += row.price
    }

    for (const [key, value] of Object.entries(redeemUserById)) {
      console.log(`Player #${key} has been grant of ${value}`)
      await Database.from('users').where('id', Number(key)).increment('credits', Number(value))
    }

    await Database.from('shop_histories').delete()
    await Database.manager.closeAll()

    this.logger.success('Refund complete')
  }
}
