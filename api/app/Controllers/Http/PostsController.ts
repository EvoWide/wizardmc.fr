/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CacheService from 'App/Services/CacheService'

export default class PostsController {
  public async all({ response }: HttpContextContract) {
    const posts = await Post.query()
      .preload('author', (builder) => {
        builder.select('username')
      })
      .orderBy('id', 'asc')
      .where('hidden', false)

    return response.send(posts)
  }

  public async index({ response, request }: HttpContextContract) {
    const page = Number(request.input('page', 1))

    if (page === 1) {
      return await CacheService.remember(
        'posts-page-1',
        async () => {
          return await this.getPosts(page)
        },
        '1h'
      )
    }

    return response.send(await this.getPosts(page))
  }

  public async show({ response, params }: HttpContextContract) {
    const post = await Post.query()
      .preload('author', (builder) => {
        builder.select('username')
      })
      .where('id', params.id)
      .where('hidden', false)
      .firstOrFail()

    return response.send(post)
  }

  private async getPosts(page: number) {
    return await Post.query()
      .preload('author', (builder) => {
        builder.select('username')
      })
      .where('hidden', false)
      .orderBy('id', 'desc')
      .paginate(page, 5)
  }
}
