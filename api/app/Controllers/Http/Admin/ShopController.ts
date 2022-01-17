/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import Category from 'App/Models/Shop/Category'
import { randomString } from '@poppinss/utils'
import ShopValidator from 'App/Validators/Admin/ShopValidator'
import Offer from 'App/Models/Shop/Offer'
import CacheService from 'App/Services/CacheService'

export default class ShopController {
  public async categories({ response }: HttpContextContract) {
    const categories = await Category.query().select('id', 'name')

    return response.send(categories)
  }

  public async storeImage({ request, response }: HttpContextContract) {
    const file = request.file('image', {
      size: '3mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!file) {
      return response.globalError("L'image utilisée est invalide.")
    }

    const configPath = Env.get('CLOUD_DESTINATION') as string
    const serverPath = configPath.startsWith('/')
      ? configPath
      : Application.publicPath(`${configPath}`)
    const fileName = `${randomString(32)}.${file.extname}`
    await file.move(`${serverPath}/shop`, { name: fileName })

    const cloudDomain =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3333/cloud'
        : 'https://cloud.wizardmc.fr'
    const filePath = `${cloudDomain}/shop/${fileName}`
    return response.json({ url: filePath })
  }

  public async show({ response, params }: HttpContextContract) {
    const offer = await Offer.query().where('id', params.id).firstOrFail()

    response.send(offer)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(ShopValidator)

    await Offer.create(data)
    CacheService.remove('shop-index')

    return response.globalSuccess('Offre boutique créée!')
  }

  public async destroy({ params, response }: HttpContextContract) {
    await Offer.query().where('id', params.id).delete()
    CacheService.remove('shop-index')

    return response.globalSuccess('Offre boutique supprimée!')
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(ShopValidator)

    await Offer.query().where('id', params.id).update(data)
    CacheService.remove('shop-index')

    return response.globalSuccess('Offre boutique modifiée!')
  }
}
