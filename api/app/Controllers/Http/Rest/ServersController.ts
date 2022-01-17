/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ServerService from 'App/Services/Server/ServerService'

export default class ServersController {
  public async setPlayerCount({ request, response }: HttpContextContract) {
    const { playerCount } = await request.validate({
      schema: schema.create({
        playerCount: schema.number(),
      }),
    })

    await ServerService.setMaxPlayerCount(playerCount)
    return response.ok('')
  }
}
