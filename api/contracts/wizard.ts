/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

declare module '@ioc:App/WizardMC' {
  export interface WizardConfig {
    recaptcha: RecaptchaConfig
    jsonapi: JsonapiConfig
    rest: RestConfig
  }

  export interface RecaptchaConfig {
    privateKey: string
    publicKey: string
  }

  export interface JsonapiConfig {
    host: string
    port: number
    user: string
    password: string
  }

  export interface RestConfig {
    key: string
    whitelist: string[]
  }
}
