import path from 'path'
import { Storage } from '@google-cloud/storage'

const KEY_FILE_PATH = path.resolve(process.cwd(), 'keys/service-worker.json')
const STORAGE = new Storage({ keyFilename: KEY_FILE_PATH })

export function getDiffBucket() {
  return STORAGE.bucket('aether.mister.pub')
}
