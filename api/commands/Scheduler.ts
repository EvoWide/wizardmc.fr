import { BaseCommand } from '@adonisjs/ace'
import schedule from 'node-schedule'

export default class SeedDb extends BaseCommand {
  public static commandName = 'scheduler'
  public static description = 'Command to start the scheduler'

  public static settings = {
    loadApp: true,
  }

  public async handle () {
    this.logger.info('Scheduler started')
    this.updateServer()
  }

  private async updateServer () {
    this.logger.info('UpdateServer job added')
    const server = (await import('App/Services/Server/ServerService')).default
    schedule.scheduleJob('update-server', '*/5 * * * * *', function () {
      server.update()
    })
  }
}
