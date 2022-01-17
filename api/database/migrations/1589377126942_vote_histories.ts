/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VoteHistories extends BaseSchema {
  protected tableName = 'vote_histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('user_id').unsigned()
      table.string('ip')
      table.timestamp('created_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
