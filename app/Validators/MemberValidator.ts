import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string([rules.email(), rules.unique({ table: 'members', column: 'email' })]),
    lattes: schema.string([rules.url()]),
    course: schema.string(),
    year: schema.string(),
    institution: schema.string(),
    description: schema.string(),
    type: schema.string(),
  })
  public messages: CustomMessages = {
    'required': 'Esse campo é obrigatório para criação do membro',
    'email.email': 'Formato email inválido',
    'email.unique': 'Email já cadastrado',
    'lattes.url': 'Formato de url inválida',
  }
}
