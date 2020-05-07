import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Rest {
  private readonly key: string = 'hello-world' // todo mettre ça dans config
  private readonly allowedAdress: string[] = ['127.0.0.1']

  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    const { authorization } = ctx.request.headers()
    if (!authorization) {
      return this.deny(ctx)
    }

    const [, token] = authorization.split(' ')
    if (token !== this.key || !this.allowedAdress.includes(ctx.request.ip())) {
      return this.deny(ctx)
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }

  private deny (ctx: HttpContextContract) {
    return ctx.response.status(401).send({ error: 'Unauthorized' })
  }
}
