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

export async function tokenOwnsId(token: string, id: string) {
  try {
    const decoded = await decodeToken(token)
    return decoded.owned.includes(id)
  } catch (e) {
    return false
  }
}

export async function createOwnerToken(id: string, previousToken?: string) {
  let owned = []

  try {
    const decoded = await decodeToken(previousToken)
    owned = decoded.owned
  } catch (e) {
    // Ignore previous invalid token
  }

  owned.push(id)

  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { owned },
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
