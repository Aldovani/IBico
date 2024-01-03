import { ISMSProvider } from '../ISMSProvider'

export class LocalSMSProvider implements ISMSProvider {
  async send(number: string, message: string): Promise<void> {
    console.log({ number, message })
  }
}
