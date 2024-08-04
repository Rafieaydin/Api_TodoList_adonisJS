/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import users_controller from '../app/controllers/users_controller.js'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'
import PostsController from '#controllers/posts_controller'

router.get('/test', [users_controller,'index'])

router.post('/login', [AuthController,'login'])
router.post('/register',[AuthController,'register'])

router.post('/logout', [AuthController,'logout']).use(middleware.auth({guards:['api']}))

router.get('/token', [AuthController,'token']).use(middleware.auth({guards: ['api'],}))

router.group(() => {
  router.get('/', [users_controller,'index'])
  router.get('/:id', [users_controller,'show'])
  router.post('/', [users_controller,'store'])
  router.put('/:id', [users_controller,'update'])
  router.delete('/:id', [users_controller,'destroy'])
}).prefix('/users').use(middleware.auth({
  guards: ['api']
}))

router.group(() => {
  router.get('/', [PostsController,'index'])
  router.get('/:id', [PostsController,'show'])
  router.post('/', [PostsController,'store'])
  router.put('/:id', [PostsController,'update'])
  router.delete('/:id', [PostsController,'destroy'])
}).prefix('/todos').use(middleware.auth({
  guards: ['api']
}))

