/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import uuid from '@lukeed/uuid'

// Ajouter un cron tab qui set expired pour les requetes qui date de > 3h
export default class UserRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public token: string

  @column()
  public method: string

  @column()
  public data: string

  @column()
  public expired: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>

  public static generateToken() {
    return uuid().replace(/-/g, '')
  }

  // Check if user is allowed to use mail
  public static async isAllowed(user: User): Promise<boolean> {
    const result = await this.query()
      .where('user_id', user.id)
      .where('created_at', DateTime.local().minus({ hour: 1 }).toSQL())
      .count('id as count')
      .first()

    return result['count'] < 4
  }
}
