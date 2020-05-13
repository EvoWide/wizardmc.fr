import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'
import Item from './Item'

export default class InventoryItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public itemId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User, { localKey: 'userId' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Item, { localKey: 'offerId' })
  public item: BelongsTo<typeof Item>
}
