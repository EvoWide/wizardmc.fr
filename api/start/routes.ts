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
  Route.post('sessions/verify', 'SessionsController.verify')
  Route.post('users', 'UsersController.store').middleware('recaptcha')
  Route.post('password-requests', 'PasswordRequestController.forget').middleware('recaptcha')
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
  Route.get('vote/lastVote', 'VotesController.lastVote')
  Route.get('vote/initiate', 'VotesController.initiate')
  Route.post('vote/confirm', 'VotesController.confirm')

  // Profil
  Route.group(() => {
    Route.get('/', 'ProfileController.index')

    Route.get('history/:type/:page?', 'HistoriesController.index')

    Route.get('security/enable', 'SecurityController.enable')
    Route.get('security/store/:token', 'SecurityController.qrcode').as('enableSecurity')
    Route.post('security/store/:token', 'SecurityController.store')

    Route.get('security/disable', 'SecurityController.disable')
    Route.delete('security/disable/:token', 'SecurityController.delete').as('disableSecurity')

    Route.get('inventory/:id', 'InventoryController.redeem')

    Route.post('upload/:type', 'ProfileController.upload')
  }).prefix('profile').namespace('App/Controllers/Http/Profile')

  Route.get('password-requests', 'PasswordRequestController.change')

  // Payment
  Route.get('payments/rates', 'PaymentsController.rates')
  Route.post('payments/dedipass', 'PaymentsController.dedipass')
  Route.post('payments/paysafecard', 'PaymentsController.paysafecard')
  Route.get('payments/paysafecard/:paymentId', 'PaymentsController.paysafecardSuccess')
}).middleware('auth')

/* Admin only */
Route.group(() => {
  // Users
  Route.get('users', 'Admin/UsersController.index')

  // Shop
  Route.get('shop/categories', 'Admin/ShopController.categories')
  Route.post('shop/storeImage', 'Admin/ShopController.storeImage')
  Route.post('shop/store', 'Admin/ShopController.store')
  Route.delete('shop/:id', 'Admin/ShopController.destroy')

  // Rewards
  Route.get('rewards', 'Admin/RewardsController.index')
  Route.post('rewards/store', 'Admin/RewardsController.store')

  // History
  Route.get('history/purchases', 'Admin/HistoriesController.purchases')
}).prefix('admin').middleware(['auth', 'admin'])

/* Rest only */
Route.group(() => {
  Route.post('users/balance', 'Rest/UsersController.balance')
  Route.post('users/withdraw', 'Rest/UsersController.withdraw')
  Route.post('users/deposit', 'Rest/UsersController.deposit')
  Route.post('users/transfer', 'Rest/UsersController.transfer')

  Route.post('codes/store', 'Rest/PromotionalCodesController.store')
}).prefix('rest').middleware('rest')

/* All users */

// Update password (both auth / guest)
Route.post('password-requests/:token', 'PasswordRequestController.update').as('passwordRequest')

// Votes Rewards + ranking
Route.get('votes', 'VotesController.index')

// Stats
Route.get('stats', 'StatsController.index').middleware('visit')

// Ipn
Route.post('payment/notification/paypal', 'NotificationsController.paypal')
Route.post('payment/notification/paysafecard/:paymentId', 'NotificationsController.paysafecard')
Route.post('payment/notification/stripe', 'NotificationsController.stripe')
//

// Launcher
Route.get('launcher', 'LauncherController.index')

/* Cloudflare cached pages */
Route.group(() => {
  // Posts
  Route.get('posts', 'PostsController.index')
  Route.get('posts/all', 'PostsController.all')
  Route.get('posts/:id', 'PostsController.show')

  // Shop
  Route.get('shop', 'ShopController.index')
  Route.get('shop/:id', 'ShopController.show')
}).prefix('c')
