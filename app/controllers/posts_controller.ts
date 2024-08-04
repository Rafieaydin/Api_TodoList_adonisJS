import Todo from '#models/todo'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'
import auth from '@adonisjs/auth/services/main'
import type { HttpContext } from '@adonisjs/core/http'


export default class PostsController {

  public async index({ request, response }: HttpContext) {
    return response.status(200).json({ message: {
      status: 'succes',
      data: await Todo.query().preload('user').exec()
    }})
  }

  public async show({ request, response }: HttpContext) {
    const { id } = request.params()
    const post = await Todo.find(id)
    await post?.load('user') // load user relation with lazy loading
    if (!post) {
      return response.status(404).json({ message: {
        status: 'error',
        message: 'Todos not found'
      }})
    }
    return await response.status(200).json({ message: {
      status: 'success',
      data: post
    }})
  }

  public async store({ request, response }: HttpContext) {
    const { title, post, user_id } = request.all()
    await request.validateUsing(createTodoValidator)
    const todo = await Todo.create({ title, post, user_id })
    return response.status(200).json({ message: {
      status: 'success',
      data: todo
    }})
  }

  public async update({ request, response, auth }: HttpContext) {
    const { title, post, user_id } = request.all()
    const todo = await Todo.find(request.params().id)
    await request.validateUsing(updateTodoValidator)

    if (!todo) {
      return response.status(404).json({ message: {
        status: 'error',
        message: 'Todos not found'
      }})
    }
    //await (await auth.authenticate()).related('todos').create({ title, post }) // bisa kaya gini di relation
    await todo.merge({ title, post, user_id })
    await todo.save()
    return response.status(200).json({ message: {
      status: 'success',
      data: todo
    }})
  }

  public async destroy({ request, response }: HttpContext) {
    const todo = await Todo.find(request.params().id)
    if (!todo) {
      return response.status(404).json({ message: {
        status: 'error',
        message: 'Todos not found'
      }})
    }
    await todo.delete()
    return response.status(200).json({ message: {
      status: 'success',
      message: 'Todos deleted'
    }})
  }
}
