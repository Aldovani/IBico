import { IEncryptProvider } from '../IEncryptProvider'
import { compare, hash } from 'bcrypt'

export class BcryptEncryptProvider implements IEncryptProvider {
  async compare(value: string, valueHashed: string): Promise<boolean> {
    const valueCompared = await compare(value, valueHashed)

    return valueCompared
  }

  async hash(value: string): Promise<string> {
    const valueHashed = await hash(value, 5)

    return valueHashed
  }
}
