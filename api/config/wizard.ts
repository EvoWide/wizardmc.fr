/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { WizardConfig } from '@ioc:App/WizardMC'
import Env from '@ioc:Adonis/Core/Env'

const wizardConfig: WizardConfig = {
  recaptcha: {
    publicKey: Env.get('RECAPTCHA_PUBLIC_KEY') as string,
    privateKey: Env.get('RECAPTCHA_PRIVATE_KEY') as string,
  },

  jsonapi: {
    host: Env.get('JSONAPI_HOST') as string,
    port: Number(Env.get('JSONAPI_PORT')),
    user: Env.get('JSONAPI_USER') as string,
    password: Env.get('JSONAPI_PASSWORD') as string,
  },

  rest: {
    key: Env.get('REST_KEY') as string,
    whitelist: ['127.0.0.1'],
  },
}

export default wizardConfig
