import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import UserSecurity from 'App/Models/UserSecurity'
import sharp from 'sharp'
import { imageSize } from 'image-size'

export default class ProfileController {
  public async index ({ auth, response }: HttpContextContract) {
    const [rewards, security] = await Promise.all([
      await Database.from('vote_inventory')
        .where('user_id', auth.user!.id)
        .innerJoin('vote_rewards', 'vote_rewards.id', 'vote_inventory.item_id')
        .orderBy('vote_inventory.created_at', 'desc')
        .select('vote_inventory.id', 'vote_rewards.name'),
      await UserSecurity.query()
        .where('user_id', auth.user!.id)
        .select('id', 'method')
        .first(),
    ])
    return response.json({ rewards, security })
  }

  public async uploadSkin ({ request, response, auth }: HttpContextContract) {
    const skin = request.file('skin', {
      size: '3mb',
      extnames: ['png'],
    })

    if (!skin) {
      return response.globalError('Le skin utilisé est invalide.')
    }

    const dims: any = await new Promise((resolve, reject) => {
      imageSize(skin.tmpPath!, function (err, dimensions) {
        if (err) {
          return reject(err)
        }
        resolve(dimensions)
      })
    })

    if (!dims || dims.width !== 64 || dims.height !== 32) {
      return response.globalError('Les dimensions du skin sont invalides : 32x64')
    }

    skin.fieldName = auth.user!.username,
    await skin.move(Application.publicPath('cloud/skin'))

    return response.globalSuccess('Le skin a bien été mis à jour !')
  }
}
