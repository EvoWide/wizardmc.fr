/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/Admin/PostValidator'
import Application from '@ioc:Adonis/Core/Application'
import CacheService from 'App/Services/CacheService'
import { randomString } from 'App/helpers'

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const posts = await Post.query()
      .preload('author', (builder) => {
        builder.select('username')
      })
      .orderBy('id', 'desc')

    return response.json(posts)
  }

  public async show({ response, params }: HttpContextContract) {
    const post = await Post.query().where('id', params.id).firstOrFail()

    response.send(post)
  }

  public async storeImage({ request, response }: HttpContextContract) {
    const file = request.file('image', {
      size: '3mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!file) {
      return response.badRequest("L'image utilisée est invalide.")
    }

    const configPath = Env.get('CLOUD_DESTINATION') as string
    const serverPath = configPath.startsWith('/')
      ? configPath
      : Application.publicPath(`${configPath}`)
    const fileName = `${randomString(32)}.${file.extname}`
    await file.move(`${serverPath}/posts`, { name: fileName })

    const cloudDomain =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3333/cloud'
        : 'https://cloud.wizardmc.fr'
    const filePath = `${cloudDomain}/posts/${fileName}`
    return response.json({ url: filePath })
  }

  public async store({ auth, request }: HttpContextContract) {
    const data = await request.validate(PostValidator)
    data.author_id = (<any>auth.user).id

    await Post.create(data)
    CacheService.remove('posts-page-1')

    return 'Article créé!'
  }

  public async destroy({ params }: HttpContextContract) {
    await Post.query().where('id', params.id).delete()
    CacheService.remove('posts-page-1')

    return 'Article supprimé!'
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.validate(PostValidator)

    await Post.query().where('id', params.id).update(data)
    CacheService.remove('posts-page-1')

    return 'Article modifié!'
  }
}
