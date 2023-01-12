import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import { translateMemberType } from 'App/utils/translate'

export default class MembersController {
  public async index({ view, session, response, request }: HttpContextContract) {
    const { type } = request.qs()

    try {
      const members = await Member.query().apply((scopes) => {
        scopes.findByType(type)
      })
      const translatedType = translateMemberType(type)
      return view.render('landingpage/members', {
        members: members.map((member) => member.toJSON()),
        translatedType,
      })
    } catch (error) {
      console.error(error)
      session.flash('error', 'Erro ao carregar membros')
      return response.redirect().back()
    }
  }
}
