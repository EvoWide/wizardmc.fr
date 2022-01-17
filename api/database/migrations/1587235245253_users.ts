/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('username', 32).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.integer('credits').unsigned().defaultTo(0)
      table.integer('votes').unsigned().defaultTo(0)
      table.string('uuid', 36).notNullable()
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.string('remember_me_token').nullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
