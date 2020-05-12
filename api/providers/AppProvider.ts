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
    // Cleanup, since app is going down
  }

  public async ready () {
    // const Logger = (await import('@ioc:Adonis/Core/Logger')).default
    const Event = (await import('@ioc:Adonis/Core/Event')).default
    Event.on('db:query', (query: any) => console.log(query.sql))

    const server = (await import('App/Services/Server/ServerService')).default
    server.update()

    schedule.scheduleJob('*/30 * * * * *', async function () {
      server.update()
    })
  }
}
