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
  Route.post('sessions/verify', 'SessionsController.check')
  Route.post('users', 'UsersController.store')

  Route.post('password-requests', 'PasswordRequestController.store')
  Route.post('password-requests/:token', 'PasswordRequestController.update').as('passwordRequest')
}).middleware('guest')

/* Auth only */
Route.group(() => {
  // Users
  Route.get('me', 'UsersController.current')
  Route.delete('sessions', 'SessionsController.destroy')

  // Shop
  Route.get('shop/buy/:id/:promotion?', 'ShopController.buy')

  // Promotional code
  Route.get('promotional-code/:code', 'PromotionalCodesController.view')

  // Vote
  Route.get('vote/initiate', 'VotesController.initiate')
  Route.post('vote/confirm', 'VotesController.confirm')
}).middleware('auth')

/* Rest only */
Route.group(() => {
  Route.post('users/balance', 'Rest/UsersController.balance')
  Route.post('users/withdraw', 'Rest/UsersController.withdraw')
  Route.post('users/deposit', 'Rest/UsersController.deposit')
  Route.post('users/transfer', 'Rest/UsersController.transfer')

  Route.post('codes/store', 'Rest/PromotionalCodesController.store')
}).prefix('rest').middleware('rest')

/* All users */

/* Cloudflare cached pages */
Route.group(() => {
  // Posts
  Route.get('posts', 'PostsController.index')
  Route.get('posts/:id', 'PostsController.show')

  // Shop
  Route.get('shop', 'ShopController.index')
  Route.get('shop/:id', 'ShopController.show')

  // Votes Rewards
  Route.get('votes', 'VotesController.index')
}).prefix('c')
