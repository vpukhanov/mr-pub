import { Express } from 'express'
import parseDiff from 'parse-diff'
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'

const STORAGE = new Storage()

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
  await STORAGE.bucket('ether.mister.pub').file(fileName).save(file.buffer)
  return fileName
}
