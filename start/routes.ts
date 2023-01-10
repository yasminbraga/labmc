/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.resource('login', 'SessionsController').only(['index', 'store'])

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
})

Route.group(() => {
  Route.get('/', async ({ view }) => {
    return view.render('home')
  })
  Route.resource('members', 'MembersController')
  Route.resource('orientations', 'OrientationsController')
}).middleware(['auth'])

Route.get('/landing', async ({ view }) => {
  return view.render('landingpage/home')
})

Route.group(() => {
  Route.get('members', 'MembersController.index')
})
  .namespace('App/Controllers/Http/Public')
  .prefix('public')
