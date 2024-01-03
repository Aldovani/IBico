import { container } from 'tsyringe'

import { IDateProvider } from './IDateProvider'
import { DayjsDateProvider } from './implementations/day-js-date-provider'

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
)
