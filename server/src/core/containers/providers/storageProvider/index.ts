import { container } from 'tsyringe'
import { IStorageProvider } from './IStorageProvider'
import { LocalStorageProvider } from './implementations/localStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
)
