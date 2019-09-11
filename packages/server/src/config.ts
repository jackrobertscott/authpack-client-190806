import * as dotenvSafe from 'dotenv-safe'
import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenvSafe.config({ allowEmptyValues: true })
  dotenv.config()
}

interface IConfig {
  environment: string
  production: boolean
  port: number
  wga: {
    secret: string
  }
}

export const config: IConfig = {
  environment: process.env.NODE_ENV || 'development',
  production: process.env.NODE_ENV === 'production',
  port: 3500,
  wga: {
    secret: process.env.WGA_SECRET_KEY as string,
  },
}
