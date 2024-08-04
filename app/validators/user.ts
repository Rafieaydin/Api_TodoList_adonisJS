import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new user.
 */
export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(), // default required
    email: vine.string().email(),
    password: vine.string().trim().minLength(6),
    role: vine.string().optional()
  })
)

/**
 * Validator to validate the payload when updating
 * an existing user.
 */
export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(), // default required
    email: vine.string().email(),
    password: vine.string().trim().minLength(6),
    role: vine.string().optional()
  })
)
