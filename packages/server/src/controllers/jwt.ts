import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error(
    'Unable to start the server without JWT_SECRET environment variable',
  )
}

type TokenPayload = {
  owned: string[]
}

async function decodeToken(token: string) {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded: TokenPayload) => {
      if (!err && decoded) {
        resolve(decoded)
      } else {
        reject()
      }
    })
  })
}

async function decodeTokenPayload(token: string) {
  try {
    const decoded = await decodeToken(token)
    return decoded
  } catch (e) {
    return { owned: [] }
  }
}

async function signJwt(payload: TokenPayload) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      (err: Error | null, encoded: string | undefined) => {
        if (!err && encoded) {
          resolve(encoded)
        } else {
          reject()
        }
      },
    )
  })
}

export async function tokenOwnsId(token: string, id: string) {
  const { owned } = await decodeTokenPayload(token)
  return owned.includes(id)
}

export async function createOwnerToken(id: string, previousToken?: string) {
  const { owned } = await decodeTokenPayload(previousToken)
  return await signJwt({ owned: [...owned, id] })
}

export async function deleteOwnerToken(id: string, previousToken: string) {
  const { owned } = await decodeTokenPayload(previousToken)
  return await signJwt({ owned: owned.filter((cur) => cur !== id) })
}
