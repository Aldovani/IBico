import { injectable } from 'tsyringe'
import { IStorageProvider } from '../IStorageProvider'
import fs from 'fs'
import { resolve } from 'path'
import { tmpFolder } from '@/core/config/upload'

@injectable()
export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    console.log({ tmpFolder, file, folder })

    await fs.promises.rename(
      resolve(tmpFolder, file),
      resolve(`${tmpFolder}/${folder}`, file),
    )
    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${tmpFolder}/${folder}`, file)
    try {
      await fs.promises.stat(fileName)
    } catch {
      return
    }

    fs.promises.unlink(fileName)
  }
}
