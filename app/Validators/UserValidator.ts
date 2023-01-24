import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string([rules.email()]),
    password: schema.string([rules.confirmed('passwordConfirmation')]),
  })
  public messages: CustomMessages = {
    'required': 'Esse campo é obrigatório para criação do membro',
    'email.email': 'Formato email inválido',
    'email.unique': 'Email já cadastrado',
    'passwordConfirmation.confirmed': 'As senhas não conferem',
  }
}
