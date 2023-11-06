export function validateDate(date: Date) {
  const currentDay = new Date()
  const isValidDate = date.getTime() >= currentDay.getTime()

  return isValidDate
}
