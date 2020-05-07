import got from 'got'

class Recaptcha {

  readonly key: {
    private: '6LcuaOsUAAAAAEKTw2axPMGzl4OqfXIKU9SwLKUp',
    public: '6LcuaOsUAAAAANjPtLaUJab9xKutrM0pSfPs76xH'
  }

  public async verify(token: string) {
    const response = await got.post('https://www.google.com/recaptcha/api/siteverify', {json: {
      secret: this.key.private,
      response: token
    }, responseType: 'json'})

    return response.statusCode == 200
  } 

}

export default new Recaptcha()