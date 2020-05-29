import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Statistics extends BaseSchema {
  protected tableName = 'statistics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('count').defaultTo(0)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
