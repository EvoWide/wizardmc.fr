/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RewardValidator from 'App/Validators/Admin/RewardValidator'
import Reward from 'App/Models/Vote/Reward'

export default class RewardsController {
  public async index({ response }: HttpContextContract) {
    return response.json(await Reward.all())
  }

  public async show({ response, params }: HttpContextContract) {
    const offer = await Reward.query().where('id', params.id).firstOrFail()

    response.send(offer)
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(RewardValidator)

    await Reward.create(data)

    return 'Récompense vote créée!'
  }

  public async destroy({ params }: HttpContextContract) {
    await Reward.query().where('id', params.id).delete()

    return 'Récompense vote supprimée!'
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(RewardValidator)

    await Reward.query().where('id', params.id).update(data)

    return 'Récompense vote modifiée!'
  }
}
