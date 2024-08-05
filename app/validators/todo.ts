import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new todo.
 */
export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string(),
    post: vine.string(),
    user_id: vine.number(),
    avatar: vine.file()
  })
)

/**
 * Validator to validate the payload when updating
 * an existing todo.
 */
export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string(),
    post: vine.string(),
    user_id: vine.number()
  })
)
