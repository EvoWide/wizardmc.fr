import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRequests extends BaseSchema {
  protected tableName = 'user_requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('token')
      table.bigInteger('user_id').unsigned()
      table.string('method').notNullable()
      table.text('data').nullable()
      table.boolean('expired').defaultTo(false)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
