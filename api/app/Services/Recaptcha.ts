const got = require('got')

class Recaptcha {

  // PRIVATE  : 6LcuaOsUAAAAAEKTw2axPMGzl4OqfXIKU9SwLKUp
  // PUBLIC   : 6LcuaOsUAAAAANjPtLaUJab9xKutrM0pSfPs76xH

  public async verify(token: string) {
    const response = await got.post('https://www.google.com/recaptcha/api/siteverify', {json: {
      secret: '6LcuaOsUAAAAANjPtLaUJab9xKutrM0pSfPs76xH',
      response: token
    }, responseType: 'json'})

    return response.body.success
  } 

}

export default new Recaptcha()