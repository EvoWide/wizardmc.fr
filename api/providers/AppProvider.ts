import { IocContract } from '@adonisjs/fold'
import { ResponseConstructorContract } from '@ioc:Adonis/Core/Response'
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

        context.macro('globalSuccess', function globalSuccess (message: string) {
          return this.send({ success: message })
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

    if (process.env.mainApp) {
      this.startScheduler()
    }
  }

  private async startScheduler () {
    const server = (await import('App/Services/Server/ServerService')).default
    const rpgParadize = (await import('App/Services/RpgParadizeService')).default

    server.update()
    rpgParadize.update()

    schedule.scheduleJob('update-server', '* * * * *', function () {
      server.update()
      rpgParadize.update()
    })
  }
}
