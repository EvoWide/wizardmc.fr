import { WizardConfig } from '@ioc:App/WizardMC'
import Env from '@ioc:Adonis/Core/Env'

const wizardConfig: WizardConfig = {
  recaptcha: {
    publicKey: Env.getOrFail('RECAPTCHA_PUBLIC_KEY') as string,
    privateKey: Env.getOrFail('RECAPTCHA_PRIVATE_KEY') as string,
  },

  jsonapi: {
    host: Env.getOrFail('JSONAPI_HOST') as string,
    port: Number(Env.getOrFail('JSONAPI_PORT')),
    user: Env.getOrFail('JSONAPI_USER') as string,
    password: Env.getOrFail('JSONAPI_PASSWORD') as string,
  },

  rest: {
    key: Env.getOrFail('REST_KEY') as string,
    whitelist: ['127.0.0.1'],
  },
}

export default wizardConfig
