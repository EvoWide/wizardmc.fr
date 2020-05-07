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
}).middleware('auth')

/* All users */

// Posts
Route.group(() => {
  Route.get('/', 'PostsController.index')
  Route.get('/:id', 'PostsController.view')
}).prefix('posts')

// Shop
Route.group(() => {
  Route.get('/', 'ShopController.index')
}).prefix('shop')
