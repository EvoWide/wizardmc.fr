import { IocContract } from '@adonisjs/fold'
import { ResponseConstructorContract } from '@ioc:Adonis/Core/Response'
import Application from '@ioc:Adonis/Core/Application'
import schedule from 'node-schedule'

export default class AppProvider {
  constructor (protected container: IocContract) {
  }

  public register () {
    // Register your own bindings
  }

  public boot () {
    // IoC container is ready
    this.container.with(['Adonis/Core/Response'],
      (context: ResponseConstructorContract) => {
        context.macro('globalError', function globalError (error: string, code?: number) {
          return this.status(code ?? 400).send({ errors: [{ message: error }] })
        }),

        context.macro('globalSuccess', function globalSuccess (message: string, data?: object) {
          return this.send({ ...data, globalSuccess: message })
        })
      },
    )
  }

  public shutdown () {
  }

  public async ready () {
    const Database = (await import('@ioc:Adonis/Lucid/Database')).default
    const Event = (await import('@ioc:Adonis/Core/Event')).default
    Event.on('db:query', Database.prettyPrint)

    // Start the scheduler only if it's the web server
    if (Application.environment === 'web') {
      this.startScheduler()
    }
  }

  private async startScheduler () {
    const server = (await import('App/Services/Server/ServerService')).default
    const rpgParadize = (await import('App/Services/RpgParadizeService')).default

    server.update()
    rpgParadize.update()

    schedule.scheduleJob('update-server', '*/30 * * * * *', function () {
      server.update()
    })

    schedule.scheduleJob('update-rpg', '* * * * *', function () {
      rpgParadize.update()
    })
  }
}
