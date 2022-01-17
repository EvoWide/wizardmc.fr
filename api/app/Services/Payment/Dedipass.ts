/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import Env from '@ioc:Adonis/Core/Env'
import got, { Response } from 'got'

class Dedipass {
  private readonly url = 'https://api.dedipass.com/v1/pay/'

  constructor(
    private privateKey = Env.get('PAYMENT_DEDIPASS_PRIVATE_KEY') as string,
    private publicKey = Env.get('PAYMENT_DEDIPASS_PUBLIC_KEY') as string
  ) {}

  public async getRates() {
    const result = await got.get(`${this.url}rates?key=${this.publicKey}`, {
      responseType: 'json',
    })

    const rates = result.body as any[]
    const formattedRates = {}

    rates.forEach((rate) => {
      if (!formattedRates.hasOwnProperty(rate.country.id)) {
        formattedRates[rate.country.id] = {
          iso: rate.country.iso,
          name: rate.country.name,
          methods: {},
        }
      }

      if (!formattedRates[rate.country.id]['methods'].hasOwnProperty(rate.solution)) {
        formattedRates[rate.country.id]['methods'][rate.solution] = []
      }

      const formattedRate = {
        rate: rate.rate,
        user_price: Number(rate.user_price),
        user_currency: rate.user_currency,
        user_earns: Number(rate.user_earns),
      }

      switch (rate.solution) {
        case 'Neosurf': {
          formattedRate['link'] = rate.link
          break
        }

        case 'SMS': {
          formattedRate['keyword'] = rate.keyword
          formattedRate['shortcode'] = rate.shortcode
          formattedRate['mention'] = rate.mention
          break
        }

        case 'Audiotel': {
          formattedRate['phone'] = rate.phone
          formattedRate['mention'] = rate.mention
          break
        }
      }

      formattedRates[rate.country.id]['methods'][rate.solution].push(formattedRate)
    })

    return formattedRates
  }

  public async validate(code: string) {
    let response: Response<any>
    try {
      response = await got.get(
        `${this.url}?public_key=${this.publicKey}&private_key=${this.privateKey}&code=${code}`,
        { responseType: 'json' }
      )
    } catch (ex) {
      return false
    }
    return response.body
  }

  public async getRate(rateUsed: number): Promise<any> {
    const rates: any = await this.getRates()
    for (let country of Object.values(rates)) {
      for (let rateList of Object.values((<any>country).methods)) {
        for (let rate of <any>rateList) {
          if (rate.rate === rateUsed) {
            return rate
          }
        }
      }
    }
    return {}
  }
}

export default new Dedipass()
