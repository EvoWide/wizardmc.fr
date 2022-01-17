/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public authorId: number

  @column()
  public title: String

  @column()
  public content: String

  @column()
  public image: String

  @column()
  public hidden: boolean

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'authorId' })
  public author: BelongsTo<typeof User>
}
