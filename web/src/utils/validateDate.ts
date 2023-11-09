export function validateDate(date: string) {
  const currentDay = new Date()
  const isValidDate = new Date(date).getTime() >= currentDay.getTime()

  return isValidDate
}
