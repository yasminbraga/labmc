import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { MemberFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run() {
    await MemberFactory.createMany(10)
  }
}
