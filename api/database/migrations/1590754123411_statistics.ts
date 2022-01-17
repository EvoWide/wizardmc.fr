/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Statistics extends BaseSchema {
  protected tableName = 'statistics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('type_id') // 0 = visits, 1 = players
      table.integer('count').defaultTo(0)
      table.timestamp('created_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
