import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orientation from 'App/Models/Orientation'
import { translateOrientationType } from 'App/utils/translate'

export default class OrientationsController {
  public async index({ view, session, response, request }: HttpContextContract) {
    const { type } = request.qs()

    try {
      const orientations = await Orientation.query()
        .apply((scopes) => {
          scopes.findByType(type)
        })
        .preload('student')
        .preload('advisor')
        .preload('secondaryAdvisor')
      const translatedType = translateOrientationType(type)
      return view.render('landingpage/orientations', {
        orientations: orientations.map((orientation) => orientation.toJSON()),
        translatedType,
      })
    } catch (error) {
      console.error(error)
      session.flash('error', 'Erro ao carregar trabalhos')
      return response.redirect().back()
    }
  }
}
