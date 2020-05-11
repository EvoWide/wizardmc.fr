import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({ response, params }: HttpContextContract) {
    const page = params.page ?? 1
    const posts = await Post.query()
      .preload('author', (builder) => {
        builder.select('username')
      })
      .where('hidden', false)
      .orderBy('id', 'desc')
      .paginate(page, 5)

    return response.send(posts)
  }

  public async show ({ response, params }: HttpContextContract) {
    const post = await Post.query()
      .preload('author', (builder) => {
        builder.select('username')
      })
      .where('id', params.id)
      .where('hidden', false)
      .firstOrFail()

    return response.send(post)
  }
}
