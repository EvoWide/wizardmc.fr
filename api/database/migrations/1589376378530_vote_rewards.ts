import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VoteRewards extends BaseSchema {
  protected tableName = 'vote_rewards'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
      table.integer('chance').unsigned()
      table.text('commands').defaultTo(null)
      table.integer('credits').defaultTo(0)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
