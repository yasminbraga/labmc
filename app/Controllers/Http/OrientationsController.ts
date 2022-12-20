import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orientation from 'App/Models/Orientation'
import { PreloadAdvisors } from 'App/Services/preloadAdvisors'
import { PreloadStudents } from 'App/Services/preloadStudents'
import OrientationValidator from 'App/Validators/OrientationValidator'

export default class OrientationsController {
  public async index({ session, response, view }: HttpContextContract) {
    try {
      const orientations = await Orientation.query()
        .preload('student')
        .preload('advisor')
        .preload('secondaryAdvisor')
      return view.render('orientation/index', { orientations })
    } catch (error) {
      console.error(error)
      session.flash('error', 'Erro ao carregar orientações')
      return response.redirect().back()
    }
  }

  public async create({ view, response, session }: HttpContextContract) {
    try {
      const students = await PreloadStudents.execute()
      const advisors = await PreloadAdvisors.execute()
      return view.render('orientation/create', { students, advisors })
    } catch (error) {
      console.error(error)
      session.flash('error', 'Erro ao carregar membros')
      return response.redirect().back()
    }
  }
  public async store({ request, response, session }: HttpContextContract) {
    const data = await request.validate(OrientationValidator)
    try {
      await Orientation.create(data)
      return response.redirect().toRoute('OrientationsController.index')
    } catch (error) {
      console.log(error)
      session.flash('error', 'Erro ao criar trabalho de orientação')
      return response.redirect().back()
    }
  }

  public async edit({ view, request, response }: HttpContextContract) {
    const id = request.param('id')
    try {
      const students = await PreloadStudents.execute()
      const advisors = await PreloadAdvisors.execute()
      const orientation = await Orientation.find(id)
      return view.render('orientation/edit', { orientation, students, advisors })
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
  public async update({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const data = await request.validate(OrientationValidator)

    const orientation = await Orientation.find(id)
    if (!orientation) {
      session.flash('error', 'Trabalho de orientação não encontrado')
      return response.redirect().back()
    }

    try {
      await orientation.merge(data).save()
      return response.redirect().toRoute('OrientationsController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
  public async destroy({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const orientation = await Orientation.find(id)
    if (!orientation) {
      session.flash('error', 'Trabalho de orientação não encontrado')
      return response.redirect().back()
    }

    try {
      await orientation.delete()
      return response.redirect().toRoute('OrientationsController.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
}
