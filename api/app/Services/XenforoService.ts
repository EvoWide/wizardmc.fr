/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import got, { Response } from 'got'

class XenforoService {
  private readonly apiUrl = 'https://forum.wizardmc.fr/api.php?key=wfUhRbmmEU5avDtMC9TEsV8EecN5LGkj'

  public async register (username: string, email: string, password: string) {
    return await this.makeRequest('register', { username, email, password })
  }

  public async isRegistered (username: string) {
    return await this.makeRequest('isRegistered', { username })
  }

  public async changePassword (username: string, password: string) {
    return await this.makeRequest('changePassword', { username, password })
  }

  public async changeEmail (username: string, email: string) {
    return await this.makeRequest('changeEmail', { username, email })
  }

  private async makeRequest (action: string, data: any) {
    let response: Response
    try {
      response = await got.post(`${this.apiUrl}&action=${action}`, {
        json: data,
        responseType: 'json',
      })
    } catch (ex) {
      return false
    }

    if (!response || response.statusCode !== 200) {
      return false
    }

    return response.body
  }
}

export default new XenforoService()
