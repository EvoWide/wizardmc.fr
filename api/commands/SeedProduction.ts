import { BaseCommand } from '@adonisjs/ace'
import { DateTime } from 'luxon'

export default class SeedProduction extends BaseCommand {
  public static commandName = 'seed:production'
  public static description = 'Command to seed the database in production, add statistics values'

  public static settings = {
    loadApp: true,
  }

  public async handle () {
    const Database = (await import('@ioc:Adonis/Lucid/Database')).default
    this.logger.info('Seed production started.')

    await Database.insertQuery().table('statistics')
      .insert({
        type_id: 0,
        count: 0,
        created_at: DateTime.local()
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toSQL(),
      })

    await Database.manager.closeAll()

    this.logger.success('Seed production finished.')
  }
}
