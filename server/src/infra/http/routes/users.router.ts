import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/users/create-user-controller'
import { EditUserController } from '../controllers/users/edit-user-controller'
import { GetProfileController } from '../controllers/users/get-profile-controller'
import { FetchUsersController } from '../controllers/users/fetch-many-users-controller'
import { DeleteUserController } from '../controllers/users/delete-user-controller'
import { ensuredAuth } from '../middlewares/ensuredAuth'
import { GetUserController } from '../controllers/users/get-user-controller'
import { upload } from '@/core/config/upload'
import { UpdateAvatarController } from '../controllers/users/update-avatar-controller'
import { DeleteAvatarController } from '../controllers/users/delete-avatar-controller'
import { GeneratePasswordResetCodeController } from '../controllers/users/generate-password-reset-code-controller'
import { ValidateCodeController } from '../controllers/users/validate-code-controller'
import { ChangePasswordController } from '../controllers/users/change-password-controller'

const createUserController = new CreateUserController()
const editUserController = new EditUserController()
const getProfileController = new GetProfileController()
const getUserController = new GetUserController()
const fetchUsersController = new FetchUsersController()
const deleteUserController = new DeleteUserController()
const updateAvatarController = new UpdateAvatarController()
const deleteAvatarController = new DeleteAvatarController()
const generatePasswordResetCodeController =
  new GeneratePasswordResetCodeController()
const validateCodeController = new ValidateCodeController()
const changePasswordController = new ChangePasswordController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController.handle)
  app.put('/users', { onRequest: [ensuredAuth] }, editUserController.handle)
  app.get(
    '/users/profile/:username',
    { onRequest: [ensuredAuth] },
    getProfileController.handle,
  )
  app.get('/users', { onRequest: [ensuredAuth] }, fetchUsersController.handle)
  app.get('/users/me', { onRequest: [ensuredAuth] }, getUserController.handle)
  app.delete(
    '/users',
    { onRequest: [ensuredAuth] },
    deleteUserController.handle,
  )

  app.put(
    '/users/avatar',
    {
      onRequest: [ensuredAuth, upload.single('avatar')],
    },
    updateAvatarController.handle,
  )
  app.delete(
    '/users/avatar',
    {
      onRequest: [ensuredAuth],
    },
    deleteAvatarController.handle,
  )
  app.post(
    '/users/reset-password/generate-code',
    generatePasswordResetCodeController.handle,
  )
  app.post('/users/reset-password/validate-code', validateCodeController.handle)
  app.put(
    '/users/reset-password/change-password',
    changePasswordController.handle,
  )
}
