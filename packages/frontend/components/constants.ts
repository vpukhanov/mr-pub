export const SERVER_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://adepti.mister.pub'
    : 'http://localhost:3001'
