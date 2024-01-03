import { BcryptEncryptProvider } from './bcrypt-encrypt-provider'

let sut: BcryptEncryptProvider

describe('BcryptProvider', () => {
  beforeEach(() => {
    sut = new BcryptEncryptProvider()
  })
  it('should compare values', async () => {
    const value = 'value'
    const valueHashed = await sut.hash(value)
    const valueCompared = await sut.compare(value, valueHashed)

    expect(valueCompared).toBe(true)
  })
})
