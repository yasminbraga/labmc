import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'yasminbragateixeira@gmail.com',
      name: 'Yasmin Braga',
      password: '123456',
    })
  }
}
