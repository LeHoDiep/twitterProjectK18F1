import { Router } from 'express'
import {
  emailVerifyController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
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

/*
des : resend email verify
method: POST
headers: {Authorization: Bearer <access_token>}
*/
usersRouter.post('/resend-email-verify', accessTokenValidator, wrapAsync(resendEmailVerifyController))

/*
des: forgot password
khi người dùng quên mật khẩu, họ cung cấp email cho mình
mình sẽ xem có user nào sở hữu email đó k, nếu có thì mình sẽ
tạo 1 forgot_password_token và gữi vào email của user đó
method: POST
path: /users/forgot-password
body: {email: string}
*/
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapAsync(forgotPasswordController))

/*
des: verify forgot password token
người dùng sau khi báo forgot password, họ sẽ nhận đc 1 email
họ vào và click vào link trong email đó, link đó sẽ có 1 request đính 
kém forgot_password_token và gữi lên server /users/verify-forgot-password-token
mình sẽ verify cái token này nếu thành công thì mình sẽ cho ngta reset password
method: POST
path: /users/verify-forgot-password-token
body: {forgot_password_token: string}
*/
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordTokenController)
)

/*
des: reset password
path: '/reset-password'
method: POST
Header: không cần, vì  ngta quên mật khẩu rồi, thì sao mà đăng nhập để có authen đc
body: {forgot_password_token: string, password: string, confirm_password: string}
*/
usersRouter.post(
  '/reset-password',
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator,
  wrapAsync(resetPasswordController)
)

/*
des: get profile của user
path: '/me'
method: get
Header: {Authorization: Bearer <access_token>}
body: {}
*/
usersRouter.get('/me', accessTokenValidator, wrapAsync(getMeController))

export default usersRouter
