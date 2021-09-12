import parseDiff from 'parse-diff'
import { v4 as uuidv4 } from 'uuid'
import { getDiffBucket } from './storage'

export function validateFile(file: Express.Multer.File) {
  if (!file) {
    return new Error('no file was passed to the uploader')
  }
  const diff = parseDiff(file.buffer.toString())
  if (!diff || diff.length === 0) {
    return new Error(
      'file is not in the diff or patch format, or the diff is empty',
    )
  }
}

export async function uploadFile(file: Express.Multer.File) {
  const fileName = uuidv4()
  await getDiffBucket().file(fileName).save(file.buffer)
  return fileName
}

export async function deleteFile(fileName: string) {
  await getDiffBucket().file(fileName).delete()
}
