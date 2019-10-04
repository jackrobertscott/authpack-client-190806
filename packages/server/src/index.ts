import * as HttpStatus from 'http-status-codes'
import fetch from 'node-fetch'
import micro, { RequestHandler, json } from 'micro'
import { config } from './config'
import { gqlcors } from './utils/gqlcors'
import { gqlerrors } from './utils/capture'

const handler: RequestHandler = async req => {
  if (req.method === 'OPTIONS') {
    return {}
  }
  const origins = config.production
    ? config.urls.api.pro.split(',')
    : config.urls.api.dev.split(',')
  if (!req.headers.origin || !origins.includes(req.headers.origin as string)) {
    const message = `${HttpStatus.UNAUTHORIZED}: Origin of ${req.headers.origin} is not allowed`
    throw new Error(message)
  }
  const body: any = await json(req)
  return fetch('http://localhost:4000', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: [req.headers.authorization, config.wga.secret]
        .filter(i => i && i.trim().length)
        .join(','),
    },
    body: JSON.stringify({
      query: body.query,
      variables: body.variables,
      operationName: body.operationName,
    }),
  }).then(response => response.json())
}

export default micro(gqlcors()(gqlerrors(handler))).listen(config.port, () => {
  console.log(`👉  Server: http://localhost:${config.port}`)
  console.log(`👉  Environment: ${config.environment}`)
  console.log(`👉  Production: ${config.production}`)
})
