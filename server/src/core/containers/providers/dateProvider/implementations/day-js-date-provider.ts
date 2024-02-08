import { IDateProvider, UniteDate } from '../IDateProvider'
import dayjs from 'dayjs'

export class DayjsDateProvider implements IDateProvider {
  addDays(date: Date, value: number): Date {
    return dayjs(date).add(value, 'days').toDate()
  }

  addHours(date: Date, value: number): Date {
    return dayjs(date).add(value, 'hour').toDate()
  }

  isSame(startDate: Date, endDate: Date, unite?: UniteDate): boolean {
    const isSame = dayjs(startDate).isSame(endDate, unite)

    return isSame
  }

  isBefore(startDate: Date, endDate: Date, unite?: UniteDate): boolean {
    const isBefore = dayjs(startDate).isBefore(endDate, unite)

    return isBefore
  }

  isBeforeOrSame(startDate: Date, endDate: Date, unite?: UniteDate): boolean {
    const isBefore = this.isBefore(startDate, endDate, unite)
    const isSame = this.isSame(startDate, endDate, unite)

    return isSame || isBefore || false
  }
}
