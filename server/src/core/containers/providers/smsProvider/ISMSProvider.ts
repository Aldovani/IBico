export interface ISMSProvider {
  send(number: string, message: string): Promise<void>
}
