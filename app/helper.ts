import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import * as fs from 'fs';

export const saveImage = async (title: string, {request} : HttpContext) => { // di type script make save image
  const avatars = request.file('avatar', {
    size: '2mb',
    extnames: ['jpg', 'png', 'jpeg']
  })

  await avatars.move(`${app.publicPath()}/uploads/`, {
    name: `${cuid()}-${title}.${avatars?.extname}`
  })
  return `/public/uploads/${avatars?.fileName}`
}

export const deleteImage = async (path: any) => {
  if(await fs.existsSync(`./${path}`)){
    await fs.unlinkSync(`./${path}`)
}
}
