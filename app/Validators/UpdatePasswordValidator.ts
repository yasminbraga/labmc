import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string([rules.confirmed('passwordConfirmation')]),
  })
  public messages: CustomMessages = {
    'required': 'Esse campo é obrigatório para criação do membro',
    'passwordConfirmation.confirmed': 'As senhas não conferem',
  }
}
