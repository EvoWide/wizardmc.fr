/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx) {
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.globalError('Elément non trouvé', 404)
    }

    if (error.code === 'E_INVALID_AUTH_PASSWORD') {
      return ctx.response.globalError('Identifiants invalides.', 422)
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.globalError('Accès non autorisé.', 401)
    }

    if (error.code === 'EAUTH') {
      return ctx.response.globalError("Une erreur est survenue, le mail n'a pas pu être envoyé.")
    }

    return super.handle(error, ctx)
  }
}
