/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Offer extends BaseModel {
  public static table = 'shop_offers'

  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public price: number

  @column()
  public deps: number | null

  @column()
  public unique: boolean

  @column()
  public version: boolean

  @column()
  public commands: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category, { localKey: 'categoryId' })
  public category: BelongsTo<typeof Category>
}
