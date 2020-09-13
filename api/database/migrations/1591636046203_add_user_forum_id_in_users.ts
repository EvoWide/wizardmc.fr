/**
 * WizardMC API Source Code.
 *
 * @license GPLv3
 * @copyright EvoWide - Valentin Kaelin & Quentin Fialon
 */

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUserForumIdInUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, table => {
      table.integer('forum_id').nullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, table => {
      table.dropColumn('forum_id')
    })
  }
}
