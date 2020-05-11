import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PasswordRequests extends BaseSchema {
  protected tableName = 'password_requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('user_id').unsigned()
      table.string('token', 36)
      table.string('adress', 255)
      table.timestamp('created_at').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
