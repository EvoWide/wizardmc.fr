import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import wizardConfig from 'config/wizard'

export default class Rest {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    const { authorization } = ctx.request.headers()
    if (!authorization) {
      return this.deny(ctx)
    }

    const [, token] = authorization.split(' ')
    if (token !== wizardConfig.rest.key || !wizardConfig.rest.whitelist.includes(ctx.request.ip())) {
      return this.deny(ctx)
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }

  private deny (ctx: HttpContextContract) {
    return ctx.response.status(401).send({ error: 'Unauthorized' })
  }
}
