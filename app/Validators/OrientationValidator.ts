import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrientationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum(['finalPaper', 'undergraduateResearch', 'thesis', 'dissertation']),
    studentId: schema.number([rules.exists({ table: 'members', column: 'id' })]),
    advisorId: schema.number([rules.exists({ table: 'members', column: 'id' })]),
    secondaryAdvisorId: schema.number.optional([rules.exists({ table: 'members', column: 'id' })]),
    title: schema.string(),
    period: schema.string(),
    fomentation: schema.string.optional([rules.requiredWhen('type', '=', 'undergraduateResearch')]),
    isCompleted: schema.boolean.optional(),
  })
  public messages: CustomMessages = {
    'required': 'Campo obrigatório',
    'existes': 'Valor não encontrado na tabela de membros',
    'fomentation.requiredWhen': 'Campo obrigatório quando tipo for Iniciação Científica',
  }
}
