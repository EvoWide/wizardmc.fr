import { IocContract } from '@adonisjs/fold'
const Stripe = require('stripe')
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready, when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = (await import('@ioc:Adonis/Lucid/Database')).default
|   const Event = (await import('@ioc:Adonis/Core/Event')).default
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class StripeProvider {
  constructor (protected container: IocContract) {
  }

  public register () {
    this.container.singleton('Adonis/Addons/Stripe', (app) => {
      const config = app.use('Adonis/Core/Env').get('STRIPE_API_KEY')
      return new Stripe(config)
    })
  }

  public async boot () {
    // All bindings are ready, feel free to use them
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
