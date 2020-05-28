import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import UserSecurity from 'App/Models/UserSecurity'
import Jimp from 'jimp'
import Env from '@ioc:Adonis/Core/Env'

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

    const image = await Jimp.read(skin.tmpPath!)
    if (!image) {
      return response.globalError('Le skin utilisé est invalide.')
    }

    const { width, height } = image.bitmap

    if (
      !(image.bitmap.width === 64 && image.bitmap.height === 32) &&
      !(image.bitmap.width === 128 && image.bitmap.height === 64)
    ) {
      return response.globalError('Les dimensions du skin sont invalides : 32x64')
    }

    let alphaCount = 0
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (idx) {
      if (this.bitmap.data[idx + 3] >= 40) {
        alphaCount++
      }
    })

    const maxAlpha = image.bitmap.width * image.bitmap.height * 0.6
    if (alphaCount >= maxAlpha) {
      return response.globalError('Le skin contient trop de pixel transparent.')
    }

    const configPath = Env.get('CLOUD_DESTINATION') as string
    const cloudPath = configPath.startsWith('/') ? configPath : Application.publicPath(`${configPath}`)

    skin.fieldName = auth.user!.username,

    await skin.move(`${cloudPath}/skin`)

    const newImage = await Jimp.read(`${cloudPath}/skin/${skin.fieldName}.${skin.extname}`)

    const avatarWidthAndX = width / 8
    const avatarHeightAndY = height / 4

    await newImage
      .crop(avatarWidthAndX, avatarHeightAndY, avatarWidthAndX, avatarHeightAndY)
      .resize(80, 80, Jimp.RESIZE_NEAREST_NEIGHBOR)
      .writeAsync(`${cloudPath}/head/${auth.user!.username}.png`)

    return response.globalSuccess('Le skin a bien été mis à jour !')
  }
}
