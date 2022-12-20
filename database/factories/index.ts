import Factory from '@ioc:Adonis/Lucid/Factory'
import Member from 'App/Models/Member'

const TYPES = ['researcher', 'graduation', 'master', 'doctorate', 'egress', 'technician']
export const MemberFactory = Factory.define(Member, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    lattes: faker.internet.url(),
    course: 'Engenharia Física',
    year: '2016',
    institution: 'UFOPA',
    description: 'Aluno da UFOPA. Alguma descrição legal da pessoa e área que ela trabalha',
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
  }
}).build()
