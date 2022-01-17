/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import Env from '@ioc:Adonis/Core/Env'
import got from 'got'

class CloudflareService {
  private readonly apiUrl = 'https://api.cloudflare.com/'
  constructor(
    private email = Env.get('CLOUDFLARE_EMAIL') as string,
    private key = Env.get('CLOUDFLARE_KEY') as string,
    private zone = Env.get('CLOUDFLARE_ZONE') as string
  ) {}

  public async clear(url: string | string[]) {
    if ((Env.get('NODE_ENV') as string) === 'development') {
      return
    }

    const response = await got.delete(`${this.apiUrl}client/v4/zones/${this.zone}/purge_cache`, {
      headers: {
        'X-Auth-Email': this.email,
        'X-Auth-Key': this.key,
        'Content-Type': 'application/json',
      },
      json: {
        files: url instanceof Array ? url : [url],
      },
    })

    return response.statusCode === 200
  }
}

export default new CloudflareService()
