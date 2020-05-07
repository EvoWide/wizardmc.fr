import { BaseCommand } from '@adonisjs/ace'

export default class SeedDb extends BaseCommand {
  public static commandName = 'seed:db'
  public static description = 'Command to seed the database while Adonis 5 does not provide seeds/factories'

  public static settings = {
    loadApp: true,
  }

  public async handle () {
    const User = (await import('App/Models/User')).default
    this.logger.info('Seed started.')

    await User.create({
      username: 'Kalane',
      password: '12345',
      email: 'kalanehd@gmail.com',
    })
    await User.create({
      username: 'Forsties08',
      password: '12345',
      email: 'forsties08@gmail.com',
    })
    this.logger.success('Seed finished.')
  }
}
