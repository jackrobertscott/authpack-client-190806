import * as HttpStatus from 'http-status-codes'
import * as Sentry from '@sentry/node'
import { send, RequestHandler } from 'micro'
import { config } from '../config'

Sentry.init({
  dsn: config.sentry.dsn,
})

/**
 * Wrap a function in an error capture try/catch set.
 */
export const captureError = (error: any) => {
  Sentry.captureException(error)
}

/**
 * Send helpful information to Sentry related to the request.
 */
export const captureScope = (req: any) => {
  Sentry.configureScope((scope: Sentry.Scope) => {
    scope.addEventProcessor(async (event: Sentry.Event) => {
      return Sentry.Handlers.parseRequest(event, req)
    })
  })
}

/**
 * Capture server errors with scope.
 */
export const gqlerrors = (handler: RequestHandler): RequestHandler => {
  return async (req, res) => {
    try {
      return await handler(req, res)
    } catch (error) {
      const chunks = error.message ? error.message.split(':') : []
      const code: number =
        chunks.length >= 2 &&
        chunks[0].trim().length === 3 &&
        !isNaN(parseInt(chunks[0]))
          ? parseInt(chunks.shift()) || 500
          : error.code || error.statusCode || 500
      const data = {
        code,
        status: HttpStatus.getStatusText(code),
        message: chunks.join(':').trim(),
        error,
      }
      if (data.code === 500) {
        captureScope(req)
        captureError(error)
      }
      send(res, data.code, data)
    }
  }
}
