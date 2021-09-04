import { Express } from 'express'
import parseDiff from 'parse-diff'

export function getDiffFromFile(file: Express.Multer.File) {
  if (!file) {
    throw new Error('no file was passed to the uploader')
  }
  const diff = parseDiff(file.buffer.toString())
  if (!diff || diff.length === 0) {
    throw new Error(
      'file is not in the diff or patch format, or the diff is empty',
    )
  }
  return diff
}
