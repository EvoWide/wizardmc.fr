import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RewardValidator from 'App/Validators/Admin/RewardValidator'
import Reward from 'App/Models/Vote/Reward'

export default class RewardsController {
  public async index ({ response }: HttpContextContract) {
    return await Reward.all()
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(RewardValidator)

    await Reward.create(data)

    return response.globalSuccess('Récompense vote créée!')
  }
}
