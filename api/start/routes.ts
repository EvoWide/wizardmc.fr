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

Route.group(() => {
  Route.get('/', 'PostsController.index')
  Route.get('/:id', 'PostsController.view')
}).prefix('posts').middleware('Auth')

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'UsersController.authenticate')
    Route.post('/register', 'UsersController.store')
  }).middleware('Guest')

  Route.post('/logout', 'UsersController.logout').middleware('Auth')
}).prefix('user')