import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import Category from 'App/Models/Shop/Category'
import { randomString } from '@poppinss/utils'
import ShopValidator from 'App/Validators/Admin/ShopValidator'
import Offer from 'App/Models/Shop/Offer'

export default class ShopController {
  public async categories ({ response }: HttpContextContract) {
    const categories = await Category.query().select('id', 'name')

    return response.send(categories)
  }

  public async storeImage ({ request, response }: HttpContextContract) {
    const file = request.file('image', {
      size: '3mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!file) {
      return response.globalError('L\'image utilisée est invalide.')
    }

    const configPath = Env.get('CLOUD_DESTINATION') as string
    const cloudPath = configPath.startsWith('/') ? configPath : Application.publicPath(`${configPath}`)
    const fileName = `${randomString(32)}.${file.extname}`
    await file.move(`${cloudPath}/shop`, { name: fileName })

    const filePath = `${cloudPath}/shop/${fileName}`
    return response.json({ url: filePath })
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(ShopValidator)

    await Offer.create(data)

    return response.globalSuccess('Offre boutique créée!')
  }
}
