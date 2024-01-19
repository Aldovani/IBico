export class DateTime {
  static addDays(date: Date, days: number) {
    const currentDay = date.getDate()
    date.setDate(currentDay + days)
    return date
  }
}
