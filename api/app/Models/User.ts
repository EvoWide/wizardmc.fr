/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  beforeCreate,
  beforeUpdate,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import uuid from '@lukeed/uuid'
import Post from 'App/Models/Post'
import Hash from '@ioc:Adonis/Core/Hash'
import UserSecurity from './UserSecurity'
import InventoryItem from './Vote/InventoryItem'
import UserRequest from './UserRequest'
import CacheService from 'App/Services/CacheService'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public credits: number

  @column()
  public votes: number

  @column()
  public uuid: string

  @column()
  public isAdmin: boolean

  @column()
  public rememberMeToken: string

  @hasMany(() => Post, { foreignKey: 'authorId' })
  public posts: HasMany<typeof Post>

  @hasOne(() => UserSecurity, { foreignKey: 'userId' })
  public security: HasOne<typeof UserSecurity>

  @hasMany(() => InventoryItem, { foreignKey: 'userId' })
  public inventory: HasMany<typeof InventoryItem>

  @hasMany(() => UserRequest, { foreignKey: 'userId' })
  public requests: HasMany<typeof UserRequest>

  @beforeCreate()
  public static async beforeCreateHook(userInstance: User) {
    userInstance.password = await Hash.make(userInstance.password)
    userInstance.uuid = uuid.v4().replace(/-/g, '')
  }

  @beforeUpdate()
  public static async beforeUpdateHook(userInstance: User) {
    if (userInstance.$dirty.password) {
      userInstance.password = await Hash.make(userInstance.password)
    }

    if (userInstance.$dirty.credits) {
      CacheService.remove(`user-${userInstance.id}-history-payments`)
    }
  }
}
