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
  token: {
    secret: string
  }
  sentry: {
    dsn?: string
  }
}

export const config: IConfig = {
  environment: process.env.NODE_ENV || 'development',
  production: process.env.NODE_ENV === 'production',
  port: 3500,
  wga: {
    secret: process.env.WGA_SECRET_KEY as string,
  },
  token: {
    secret: process.env.SUPER_SECRET_TOKEN as string,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN as string,
  },
}
