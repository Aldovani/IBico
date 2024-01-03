import { container } from 'tsyringe'
import { ISMSProvider } from './ISMSProvider'
import { LocalSMSProvider } from './implementations/localSMSProvider'

container.registerSingleton<ISMSProvider>('SMSProvider', LocalSMSProvider)
