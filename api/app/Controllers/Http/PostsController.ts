import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  // TODO : Mettre en cache cloudlare toutes les requêtes
  public async index ({ response, params }: HttpContextContract) {
    const page = params.page ?? 1
    const posts = await Post.query().preload('author', (builder) => {
      builder.select('username')
    }).paginate(page, 5)

    response.send(posts)
  }

  public async view ({ response, params }: HttpContextContract) {
    const post = await Post.query().preload('author', (builder) => {
      builder.select('username')
    }).where('id', '=', params.id).firstOrFail()
    response.send(post)
  }
}
