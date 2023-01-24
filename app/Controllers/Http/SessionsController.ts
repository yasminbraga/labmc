import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async index({ view }: HttpContextContract) {
    return view.render('sessions/login')
  }
  public async store({ auth, request, response, session }: HttpContextContract) {
    const { email, password } = request.body()
    try {
      await auth.use('web').attempt(email, password)
      return response.redirect('/account')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }
}
