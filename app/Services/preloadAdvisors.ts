import Database from '@ioc:Adonis/Lucid/Database'

export class PreloadAdvisors {
  public static async execute() {
    return Database.query().from('members').where('type', 'researcher')
  }
}
