/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import crypto from 'crypto'
import got, { Response } from 'got'
import { JsonapiConfig } from '@ioc:App/WizardMC'

interface ResponseBody {
  result: string
  success: any
}

export default class Minecraft {
  constructor(protected options: JsonapiConfig) {}

  private generateUrl(method: string, args?: any) {
    const key = this.generateKey(method)
    let url = `http://${this.options.host}:${this.options.port}/api/call?method=${method}&key=${key}&tag=null`
    if (args) {
      if (typeof args !== 'object') {
        args = [args]
      }
      url += '&args=' + escape(JSON.stringify(args))
    }
    return url
  }

  private generateKey(method: string) {
    return crypto
      .createHash('sha256')
      .update(this.options.user + method + this.options.password)
      .digest('hex')
  }

  private async call(method: string, args?: any) {
    const url = this.generateUrl(method, args)
    let response: Response<ResponseBody>

    try {
      response = await got.get(url, { responseType: 'json', timeout: 1500 })
    } catch (ex) {
      return null
    }

    if (response.statusCode !== 200 || response.body.result !== 'success') {
      return null
    }
    return response.body.success
  }

  public async getPlayerCount(): Promise<number> {
    const response = await this.call('getPlayerCount')
    return response !== null ? Number(response) : -1
  }

  public async getPlayerNames(): Promise<string[]> {
    const response = await this.call('getPlayerNames')
    return response !== null ? response : []
  }

  public async executeCommand(strCommands: string) {
    const commands = strCommands.split('|')
    for (const command of commands) {
      await this.call('runConsoleCommand', command)
    }
    return []
  }
}

export interface MinecraftOptions {
  adress: string
  port: number
  user: string
  password: string
  salt?: string
}
