export interface IDateProvider {
  compareIfAfter(startDate: Date, endDate: Date): boolean
  addHours(date: Date, value: number): Date
}
