import { Router } from 'express'
import {
  emailVerifyController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()

usersRouter.get('/login', loginValidator, wrapAsync(loginController))

usersRouter.post('/register', registerValidator, wrapAsync(registerController))

/*
des: đăng xuất
path: /users/logout
method: POST
Header: {Authorization: 'Bearer <access_token>'}
body: {refresh_token: string}
*/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/*
des: verify email
khi người dùng đăng ký, trong email của họ sẽ có 1 link
trong link này đã setup sẵn 1 request kèm email_verify_token
thì verify email là cái route cho request đó
method: POST
path: /users/verify-email
body: {email_verify_token: string}
*/
usersRouter.post('/verify-email', emailVerifyValidator, wrapAsync(emailVerifyController))

export default usersRouter
