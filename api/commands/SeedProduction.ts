import { BaseCommand } from '@adonisjs/ace'

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
      .multiInsert([
        { name: 'visits' },
        { name: 'may_players' },
      ])

    await Database.manager.closeAll()

    this.logger.success('Seed production finished.')
  }
}
