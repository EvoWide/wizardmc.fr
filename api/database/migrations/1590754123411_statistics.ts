import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Statistics extends BaseSchema {
  protected tableName = 'statistics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('count').defaultTo(0)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    this.defer(async () => {
      await Database.insertQuery().table(this.tableName)
        .multiInsert([
          {
            name: 'visits',
          },
          {
            name: 'max_players',
          },
        ])
    })
    await Database.manager.closeAll()
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
