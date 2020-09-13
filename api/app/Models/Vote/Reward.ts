/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reward extends BaseModel {
  public static table = 'vote_rewards'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public chance: number

  @column()
  public commands: string

  @column()
  public credits: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
