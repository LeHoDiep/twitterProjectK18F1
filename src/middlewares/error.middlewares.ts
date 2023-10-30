import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

//trong err thì có status và message
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  //nơi tập kết lỗi từ mọi nơi trên hệ thống về
  //nếu lỗi nhận đc thuộc dạng ErrorWithStatus thì trả về status và message
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }

  //còn nếu code mà chạy xuống đc đây thì error sẽ là 1 lỗi mặc định
  //err{message, stack, name}
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  //ném lỗi đó cho người dùng
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, ['stack'])
  })
}
