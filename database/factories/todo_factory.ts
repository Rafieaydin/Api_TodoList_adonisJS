import factory from '@adonisjs/lucid/factories'
import Todo from '#models/todo'

export const TodoFactory = factory
  .define(Todo, async ({ faker }) => {
    return {
      title: faker.lorem.words(3),
      post: faker.lorem.words(10),
      user_id: 1,
      avatar: faker.image.imageUrl()
    }
  })
  .build()
