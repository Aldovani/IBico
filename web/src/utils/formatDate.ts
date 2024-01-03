export function formatDate(
  date: number | Date,
  opts?: Intl.DateTimeFormatOptions | undefined,
) {
  const options = new Intl.DateTimeFormat('pt-br', {
    dateStyle: 'short',
    localeMatcher: 'best fit',
    ...opts,
  })

  return options.format(date)
}
