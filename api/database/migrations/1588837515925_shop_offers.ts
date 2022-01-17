/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ShopOffers extends BaseSchema {
  protected tableName = 'shop_offers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id')
      table.string('name', 255)
      table.text('description')
      table.string('image')
      table.integer('price')
      table.text('commands').defaultTo(null)
      table.integer('deps').defaultTo(null)
      table.boolean('unique').defaultTo(false)
      table.boolean('version').defaultTo(false)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
