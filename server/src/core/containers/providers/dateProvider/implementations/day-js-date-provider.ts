import { IDateProvider } from '../IDateProvider'
import dayjs from 'dayjs'

export class DayjsDateProvider implements IDateProvider {
  compareIfAfter(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isAfter(endDate)
  }

  addHours(date: Date, value: number): Date {
    return dayjs(date).add(value, 'hour').toDate()
  }
}
