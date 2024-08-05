import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'



export default class AuthController {

  public async login({ request, response }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.status(401).json({ message: {
        status: 'error',
        message: 'Invalid credentials'
      }})
    }
    const token = await User.accessTokens.create(user)

    return response.status(200).json({ message: {
      status: 'success',
      data: {
        user :user,
        token:token
      }
    }})
  }

  public async register({request, response}:HttpContext){
    const {fullname,email, password, repeat_password,role} = request.all()
    const user = User.findBy('email', email)
    if (!user){
      return response.status(401).json({
        messages :{
          status:'error',
          message: 'invalid credential'
        }
      })
    }
    if(password == repeat_password){
      var users = await User.create({ fullName:fullname, email:email, password:password, role:role })
      var token = await User.accessTokens.create(users)
      return response.status(200).json({ message: {
        status: 'success',
        data: {
          user :user,
          token:token
        }
      }})
    }
    // else
    return response.status(401).json({
      messages :{
        status:'error',
        message: 'invalid credential'
      }
    })
  }

  public async logout({ response, auth }: HttpContext) {
    const user = await User.accessTokens.delete(auth.getUserOrFail(),(await auth.authenticate()).currentAccessToken.identifier)
    return response.status(200).json({ message: {
      status: 'success',
      message: user
    }})
  }

  public async token({ response,auth } : HttpContext) {
    return response.status(200).json({
      status:'succes',
      data : await User.accessTokens.all(auth.user!)
    })
  }

}
