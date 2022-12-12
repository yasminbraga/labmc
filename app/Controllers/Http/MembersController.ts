import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import MemberValidator from 'App/Validators/MemberValidator'

export default class MembersController {
  public async index({ view, session, response }: HttpContextContract) {
    try {
      const members = await Member.all()

      return view.render('members/index', { members: members.map((member) => member.toJSON()) })
    } catch (error) {
      console.error(error)
      session.flash('error', 'Erro ao carregar membros')
      return response.redirect().back()
    }
  }
  public async create({ view }: HttpContextContract) {
    return view.render('members/create')
  }
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(MemberValidator)

    await Member.create(data)
    return response.redirect().toRoute('MembersController.index')
  }

  public async edit({ view, request, response }: HttpContextContract) {
    const id = request.param('id')
    try {
      const member = await Member.find(id)
      return view.render('members/edit', { member })
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
  public async update({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const data = request.body()

    const member = await Member.find(id)
    if (!member) {
      session.flash('error', 'Membro não encontrado')
      return response.redirect().back()
    }

    try {
      await member.merge(data).save()
      return response.redirect().toRoute('MembersController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
  public async destroy({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const member = await Member.find(id)
    if (!member) {
      session.flash('error', 'Membro não encontrado')
      return response.redirect().back()
    }

    try {
      await member.delete()
      return response.redirect().toRoute('MembersController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
}
