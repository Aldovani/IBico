export type UniteDate = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

export interface IDateProvider {
  isBeforeOrSame(startDate: Date, endDate: Date, unite?: UniteDate): boolean
  isBefore(startDate: Date, endDate: Date, unite?: UniteDate): boolean
  isSame(startDate: Date, endDate: Date, unite?: UniteDate): boolean
  addHours(date: Date, value: number): Date
  addDays(date: Date, value: number): Date
}
