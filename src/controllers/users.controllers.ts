import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.request'

export const loginController = async (req: Request, res: Response) => {
  //vào req anh lấy user ra, và lấy _id của user đó
  const { user }: any = req
  const user_id = user._id
  //dùng cái user_id đó tạo access_token và refresh_token
  const result = await userService.login(user_id)
  //nếu k bug gì thì thành công lun
  return res.json({
    message: 'login successfully',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  // tạo 1 user mới và bỏ vào collection users trong database
  const result = await userService.register(req.body)
  return res.status(201).json({
    message: 'register successfully',
    result
  })
}
