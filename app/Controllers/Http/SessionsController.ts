import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async index({ view }: HttpContextContract) {
    return view.render('sessions/login')
  }
  public async store({ auth, request, response, session }: HttpContextContract) {
    const { email, password } = request.body()
    console.log(email)
    try {
      await auth.use('web').attempt(email, password)
      return response.redirect('/')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }

  // public async destroy({ auth, response, session }: HttpContextContract) {
  //   try {
  //     session.clear()
  //     await auth.use('web').logout()
  //     return response.redirect().toRoute('SessionsController.index')
  //   } catch (error) {
  //     console.error(error)
  //     return response.redirect().back()
  //   }
  // }
}
