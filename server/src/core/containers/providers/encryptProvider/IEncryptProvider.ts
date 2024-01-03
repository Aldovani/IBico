export interface IEncryptProvider {
  compare(value: string, valueHashed: string): Promise<boolean>
  hash(value: string): Promise<string>
}
