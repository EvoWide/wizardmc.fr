import got from 'got'

class Dedipass {
  private readonly url = 'https://api.dedipass.com/v1/pay/rates?key=ca06117fd846ee203543455bc2aea023'

  public async getRates () {
    const result = await got.get(this.url, {
      responseType: 'json',
    })

    const rates = result.body as any[]
    const formattedRates = {}

    rates.forEach(rate => {
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
        user_price: rate.user_price,
        user_currency: rate.user_currency,
        user_earns: rate.user_earns,
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
          formattedRate['graphic'] = {
            shortcode: rate.legal_graphic.shortcode,
            footer: rate.legal_graphic.footer,
          }
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
}

export default new Dedipass()
