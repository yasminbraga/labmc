import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'members'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('lattes').notNullable()
      table.string('course').notNullable()
      table.string('year').notNullable()
      table.string('institution').notNullable()
      table.string('description')
      table
        .enum('type', ['researcher', 'graduation', 'master', 'doctorate', 'egress', 'technician'])
        .notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
