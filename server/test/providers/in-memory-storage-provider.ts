import { IStorageProvider } from '@/core/providers/storage'

export class InMemoryStorageProvider implements IStorageProvider {
  public files: [string, string][] = []

  async save(fileName: string, folder: string): Promise<string> {
    const newFileName = fileName + new Date().toISOString()
    this.files.push([newFileName, folder])

    return newFileName
  }

  async delete(fileName: string, folder: string): Promise<void> {
    const files = this.files.filter(
      (item) => item[0] !== fileName && item[1] !== folder,
    )

    this.files = files
  }
}
