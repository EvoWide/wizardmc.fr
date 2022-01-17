/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import got from 'got'
import Env from '@ioc:Adonis/Core/Env'

class Recaptcha {
  public async verify(token: string) {
    const response = await got.post('https://www.google.com/recaptcha/api/siteverify', {
      responseType: 'json',
      json: {
        secret: Env.get('RECAPTCHA_PRIVATE_KEY'),
        response: token,
      },
    })
    return response.statusCode === 200
  }
}

export default new Recaptcha()
