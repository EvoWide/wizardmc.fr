import crypto from 'crypto'
import got, { Response } from 'got'
import { JsonapiConfig } from '@ioc:App/WizardMC'

export default class Minecraft {
  constructor (protected options: JsonapiConfig) {
  }

  private generateUrl (method: string, args?: any) {
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

  private generateKey (method: string) {
    return crypto.createHash('sha256')
      .update(this.options.user + method + this.options.password)
      .digest('hex')
  }

  private async call (method: string, args?: any): Promise<any> {
    const url = this.generateUrl(method, args)
    const response: any = await got.get(url, { responseType: 'json', timeout: 1500 })

    if (response.statusCode !== 200 || response.body.result !== 'success') {
      return null
    }
    return response.body.success
  }

  public async getPlayerCount (): Promise<number> {
    const response: any = await this.call('getPlayerCount')
    return response !== null ? Number(response) : -1
  }

  public async getPlayerNames (): Promise<string[]> {
    const response: any = await this.call('getPlayerNames')
    return response !== null ? response : []
  }
}

export interface MinecraftOptions {
  adress: string,
  port: number,
  user: string,
  password: string,
  salt?: string
}
