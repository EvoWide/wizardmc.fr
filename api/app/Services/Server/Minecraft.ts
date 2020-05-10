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

  private async call (method: string, args?: any): Promise<Response> {
    const url = this.generateUrl(method, args)
    return await got.get(url, { responseType: 'json', timeout: 1500 })
  }

  public async getPlayerCount (): Promise<number> {
    const response = await this.call('getPlayerCount')
    console.log(response)
    return -1
  }
}

export interface MinecraftOptions {
  adress: string,
  port: number,
  user: string,
  password: string,
  salt?: string
}
