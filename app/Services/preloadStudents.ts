import Database from '@ioc:Adonis/Lucid/Database'

export class PreloadStudents {
  public static async execute() {
    return Database.query()
      .from('members')
      .where('type', 'graduation')
      .orWhere('type', 'master')
      .orWhere('type', 'doctorate')
  }
}
