/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    globalError(message: string, code?: number): this
    globalSuccess(message: string, data?: object): this
  }
}
