import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
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

  @belongsTo(() => User, { localKey: 'userId' })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async beforeCreateHook (requestInstance: UserRequest) {
    requestInstance.token = uuid().replace(/-/g, '')
  }
}
