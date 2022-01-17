/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VoteInventoryItems extends BaseSchema {
  protected tableName = 'vote_inventory'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('user_id').unsigned()
      table.integer('item_id').unsigned()
      table.timestamp('created_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
