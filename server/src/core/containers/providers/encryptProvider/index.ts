import { container } from 'tsyringe'

import { IEncryptProvider } from './IEncryptProvider'
import { BcryptEncryptProvider } from './implementations/bcrypt-encrypt-provider'

container.registerSingleton<IEncryptProvider>(
  'EncryptProvider',
  BcryptEncryptProvider,
)
