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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/* Guests only */
Route.group(() => {
  // Users
  Route.post('sessions', 'SessionsController.store')
  Route.post('users', 'UsersController.store')
}).middleware('guest')

/* Auth only */
Route.group(() => {
  // Users
  Route.get('me', 'UsersController.current')
  Route.delete('sessions', 'SessionsController.destroy')

  // Shop
  Route.get('/shop/buy/:id', 'ShopController.buy')
}).middleware('auth')

/* Rest only */
Route.group(() => {
  Route.post('balance', 'Rest/UsersController.balance')
  Route.post('withdraw', 'Rest/UsersController.withdraw')
  Route.post('deposit', 'Rest/UsersController.deposit')
  Route.post('transfer', 'Rest/UsersController.transfer')
}).prefix('rest').middleware('rest')

/* All users */

/* Cloudflare cached pages */

Route.group(() => {
  // Posts
  Route.get('/posts', 'PostsController.index')
  Route.get('/posts/:id', 'PostsController.view')

  // Shop
  Route.get('/shop', 'ShopController.index')
  Route.get('/shop/:id', 'ShopController.view')
}).prefix('c')
