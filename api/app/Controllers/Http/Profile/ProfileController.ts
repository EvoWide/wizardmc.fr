/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import UserSecurity from 'App/Models/UserSecurity'
import Jimp from 'jimp'
import Env from '@ioc:Adonis/Core/Env'
import CloudflareService from 'App/Services/CloudflareService'
import SkinService from 'App/Services/SkinService'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProfileController {
  public async index({ auth, response }: HttpContextContract) {
    const [rewards, security] = await Promise.all([
      await Database.from('vote_inventory')
        .where('user_id', (<any>auth.user).id)
        .innerJoin('vote_rewards', 'vote_rewards.id', 'vote_inventory.item_id')
        .orderBy('vote_inventory.created_at', 'desc')
        .select('vote_inventory.id', 'vote_rewards.name'),
      await UserSecurity.query()
        .where('user_id', (<any>auth.user).id)
        .select('id', 'method')
        .first(),
    ])
    return response.json({ rewards, security })
  }

  public async upload({ request, response, auth, params }: HttpContextContract) {
    if (!['skin', 'cape'].includes(params.type)) {
      return response.badRequest('')
    }
    const type = params.type

    const data = await request.validate({
      schema: schema.create({
        [type]: schema.file({
          size: '2mb',
          extnames: ['png'],
        }),
      }),
      messages: {
        'skin.file.extname': "Le format de l'image est incorrect.",
        'skin.file.size': "La taille de l'image ne peut pas dépasser 2MB.",
        'cape.file.extname': "Le format de l'image est incorrect.",
        'cape.file.size': "La taille de l'image ne peut pas dépasser 2MB.",
      },
    })
    const file = data[type]
    if (!file) {
      return response.badRequest("L'image utilisée est invalide.")
    }

    const image = await Jimp.read(file.tmpPath!)
    if (!image) {
      return response.badRequest("L'image utilisée est invalide.")
    }

    const { width, height } = image.bitmap

    if (
      !(image.bitmap.width === 64 && image.bitmap.height === 32) &&
      !(image.bitmap.width === 128 && image.bitmap.height === 64)
    ) {
      return response.badRequest("Les dimensions de l'image sont invalides : 64x32 | 128x64")
    }

    // We check the number of transparent pixels only on the skin
    if (type === 'skin') {
      let alphaCount = 0
      const factor = image.bitmap.width / 64

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        if (this.bitmap.data[idx + 3] < 200 && SkinService.isInside(x, y, factor)) {
          alphaCount++
        }
      })

      const maxAlpha = image.bitmap.width * image.bitmap.height * 0.2
      if (alphaCount >= maxAlpha) {
        return response.badRequest('Le skin contient trop de pixel transparent.')
      }
    }

    const configPath = Env.get('CLOUD_DESTINATION') as string
    const cloudPath = configPath.startsWith('/')
      ? configPath
      : Application.publicPath(`${configPath}`)

    await file.move(`${cloudPath}/${type}`, { name: `${(<any>auth.user).username}.png` })

    const cacheUrls = [`https://cloud.wizardmc.fr/${type}/${(<any>auth.user).username}.png`]
    if (type === 'skin') {
      cacheUrls.push(`https://cloud.wizardmc.fr/head/${(<any>auth.user).username}.png`)
    }

    await CloudflareService.clear(cacheUrls)

    // If it is the change of the skin, we generate the avatar
    if (type === 'skin') {
      const newImage = await Jimp.read(`${cloudPath}/${type}/${(<any>auth.user).username}.png`)

      const avatarWidthAndX = width / 8
      const avatarHeightAndY = height / 4

      await newImage
        .crop(avatarWidthAndX, avatarHeightAndY, avatarWidthAndX, avatarHeightAndY)
        .resize(80, 80, Jimp.RESIZE_NEAREST_NEIGHBOR)
        .writeAsync(`${cloudPath}/head/${(<any>auth.user).username}.png`)
    }

    return `Le ${type} a bien été mis à jour !`
  }
}
