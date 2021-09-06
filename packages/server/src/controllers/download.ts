import { getDiffBucket } from './storage'

export async function fileExists(file: string) {
  return file && (await getDiffBucket().file(file).exists())[0]
}

export function createFileReadStream(file: string) {
  return getDiffBucket().file(file).createReadStream()
}
