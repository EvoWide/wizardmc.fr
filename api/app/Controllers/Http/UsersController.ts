/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'

export default class UsersController {
  public async current({ auth, response, session }: HttpContextContract) {
    const offersSession = session.get('offers')
    if (offersSession) {
      return response.send({ user: auth.user, offers: offersSession })
    }

    const offers = (
      await Database.from('shop_histories')
        .innerJoin('shop_offers', 'shop_offers.id', 'shop_histories.offer_id')
        .where('shop_histories.user_id', (<any>auth.user).id)
        .andWhere((builder) => {
          builder.where((subBuilder) => {
            subBuilder
              .where('shop_offers.unique', true)
              .orWhere('shop_histories.version', Number(Env.get('SERVER_VERSION')))
          })
          builder.orWhere((subBuilder) => {
            subBuilder
              .where('shop_offers.category_id', 1)
              .where('shop_offers.unique', false)
              .where('shop_offers.version', false)
              .where(
                'shop_histories.created_at',
                '>=',
                DateTime.local().minus({ month: 1 }).toSQL()
              )
          })
        })
        .select('shop_offers.id')
    ).map((o) => o.id)

    session.put('offers', offers)

    return response.send({ user: auth.user, offers })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)

    if (
      !/^[a-z](?:_?[a-z0-9])*$/i.test(data.username) ||
      (data.username.match(/_/g) || []).length > 1
    ) {
      return response.abort('Le format du pseudo est incorrect: a-Z et un seul _ !')
    }

    const alreadyExist = await User.query()
      .whereRaw('LOWER(username) LIKE ?', [data.username.toLowerCase()])
      .orWhere('email', data.email)
      .first()

    if (alreadyExist) {
      return response.abort("L'adresse email ou le pseudo est déjà utilisé.")
    }

    await User.create(data)

    await auth.attempt(data.username, data.password)

    return 'Vous vous êtes inscrit avec succès.'
  }
}
