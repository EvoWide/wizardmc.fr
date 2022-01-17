/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class Rest {
  private constructor(
    private key = Env.get('REST_KEY', '') as string,
    private whitelist = (Env.get('REST_WHITELIST', '') as string)
      .split(',')
      .filter((n) => n.length > 0)
  ) {}

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { authorization } = ctx.request.headers()
    if (!authorization) {
      return this.deny(ctx)
    }

    const [, token] = authorization.split(' ')
    /**
     * Check if api is enabled (key not empty) and if key is equals to request token
     */
    if (!this.key || token !== this.key) {
      return this.deny(ctx)
    }

    /**
     * Check if whitelist enabled and if whitelist contain request adress.
     */
    if (this.whitelist.length !== 0 && !this.whitelist.includes(ctx.request.ip())) {
      return this.deny(ctx)
    }

    await next()
  }

  private deny(ctx: HttpContextContract) {
    return ctx.response.status(401).send({ error: 'Unauthorized' })
  }
}
