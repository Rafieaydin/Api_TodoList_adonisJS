
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { TodoFactory } from '#database/factories/todo_factory'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        fullName: 'John Doe',
        email: 'john@gmail.com',
        password: 'password',
        role: 'admin'
      },
      {
        fullName: 'Jane Doe',
        email: 'jane@gmail.com',
        password: 'password',
        role: 'user'
      },
      {
        fullName: 'admin',
        email: 'admin@gmail.com',
        password: 'password',
        role: 'admin'
      }
    ])
    await TodoFactory.createMany(10)
  }
}
