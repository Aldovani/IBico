import { IDateProvider } from '../IDateProvider'
import { DayjsDateProvider } from './day-js-date-provider'

let sut: IDateProvider

describe('Day-js', () => {
  beforeAll(() => {
    sut = new DayjsDateProvider()
  })

  it('func  Add days', () => {
    const date = sut.addDays(new Date('01-01-2024'), 1)
    const day = date.getDate()
    expect(day).toBe(2)
  })

  it('func  Add hours', () => {
    const date = sut.addHours(new Date('01-01-2024 '), 2)
    const hours = date.getHours()
    expect(hours).toBe(2)
  })

  it('func isBeforeOrSame', () => {
    const isBeforeOrSame = sut.isBeforeOrSame(
      new Date(2023, 1, 1, 0),
      new Date(2024, 1, 1, 10),
      'd',
    )
    expect(isBeforeOrSame).toBe(true)
  })

  it('func isBefore', () => {
    const isBefore = sut.isBefore(
      new Date(2023, 1, 1, 0),
      new Date(2024, 1, 1, 10),
      'd',
    )
    expect(isBefore).toBe(true)
  })

  it('func isSame', () => {
    const isSame = sut.isSame(
      new Date(2024, 1, 1, 0),
      new Date(2024, 1, 1, 10),
      'd',
    )
    expect(isSame).toBe(true)
  })
})
