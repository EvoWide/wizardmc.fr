/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from '../User'
import Reward from './Reward'

export default class InventoryItem extends BaseModel {
  public static table = 'vote_inventory'

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

  @belongsTo(() => Reward, { localKey: 'offerId' })
  public reward: BelongsTo<typeof Reward>
}
