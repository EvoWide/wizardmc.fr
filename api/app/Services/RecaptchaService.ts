import got from 'got'
import wizardConfig from 'config/wizard'

class Recaptcha {
  public async verify (token: string) {
    const response = await got.post('https://www.google.com/recaptcha/api/siteverify', {
      json: {
        secret: wizardConfig.recaptcha.privateKey,
        response: token,
      }, responseType: 'json',
    })

    return response.statusCode === 200
  }
}

export default new Recaptcha()
