import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({ view, session, response }: HttpContextContract) {
    try {
      const users = await User.all()

      return view.render('users/index', { users: users.map((member) => member.toJSON()) })
    } catch (error) {
      console.error(error)
      session.flash('error', 'Erro ao carregar usuários do sistema')
      return response.redirect().back()
    }
  }
  public async create({ view }: HttpContextContract) {
    return view.render('users/create')
  }
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator)

    try {
      await User.create(data)
      return response.redirect().toRoute('UsersController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }

  public async edit({ view, request, response }: HttpContextContract) {
    const id = request.param('id')
    try {
      const user = await User.find(id)
      return view.render('users/edit', { user: user?.toJSON() })
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
  public async update({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const data = request.body()

    const user = await User.find(id)
    if (!user) {
      session.flash('error', 'Usuário não encontrado')
      return response.redirect().back()
    }

    try {
      await user.merge(data).save()
      return response.redirect().toRoute('UsersController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
  public async destroy({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.find(id)
    if (!user) {
      session.flash('error', 'Usuário não encontrado')
      return response.redirect().back()
    }

    try {
      await user.delete()
      return response.redirect().toRoute('UsersController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }

  public async account({ view }) {
    return view.render('users/main')
  }
  public async changePassword({ view }: HttpContextContract) {
    return view.render('users/edit-password')
  }

  public async updatePassword({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(UpdatePasswordValidator)
    try {
      const user = await User.find(auth.user?.id)

      await user?.merge({ password: data.password }).save()
      return response.redirect().toRoute('UsersController.account')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
}
