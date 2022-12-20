import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orientations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.boolean('is_completed').defaultTo(false)
      table.string('period').notNullable()
      table.string('fomentation').nullable()
      table.enum('type', ['finalPaper', 'undergraduateResearch', 'thesis', 'dissertation'])
      table.integer('advisor_id').references('id').inTable('members').notNullable()
      table.integer('secondary_advisor_id').references('id').inTable('members').nullable()
      table.integer('student_id').references('id').inTable('members').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
