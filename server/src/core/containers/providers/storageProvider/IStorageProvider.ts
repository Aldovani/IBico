export interface IStorageProvider {
  save(fileName: string, folder: string): Promise<string>
  delete(fileName: string, folder: string): Promise<void>
}
