import { ISMSProvider } from '@/core/containers/providers/smsProvider/ISMSProvider'

export class InMemorySMSProvider implements ISMSProvider {
  async send(number: string, message: string): Promise<void> {
    console.log(`${number}:${message}`)
  }
}
