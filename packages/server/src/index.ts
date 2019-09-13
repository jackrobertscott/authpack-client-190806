import * as HttpStatus from 'http-status-codes'
import fetch from 'node-fetch'
import micro, { RequestHandler, json } from 'micro'
import { graphql } from 'graphql'
import { config } from './config'
import { schema } from './schema'
import { gqlcors } from './utils/gqlcors'
import { decode } from './utils/jwt'
import { gqlerrors } from './utils/capture'

const handler: RequestHandler = async req => {
  if (req.method === 'OPTIONS') {
    return {}
  }
  const body: any = await json(req)
  if (body.api) {
    return fetch('http://localhost:4000', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.wga.secret,
      },
      body: JSON.stringify({
        query: body.query,
        variables: body.variables,
        operationName: body.operationName,
      }),
    }).then(response => response.json())
  }
  const context: any = { headers: req.headers }
  if (typeof body.query !== 'string' || body.query.length > 3000) {
    const message = `${HttpStatus.BAD_REQUEST}: GraphQL query must be less than 3000 characters`
    throw new Error(message)
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    context.authtype = 'jwt'
    const encryptedString = req.headers.authorization
      .replace('Bearer', '')
      .trim()
    context.populate = decode(encryptedString)
  }
  return graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
    operationName: body.operationName,
    contextValue: context,
  }).then(({ data, errors }) => {
    if (errors) throw errors[0]
    return data
  })
}

export default micro(
  gqlcors({
    origin: config.production
      ? 'https://wga.windowgadgets.io'
      : 'http://localhost:3000',
  })(gqlerrors(handler))
).listen(config.port, () => {
  console.log(`👉  Server: http://localhost:${config.port}`)
  console.log(`👉  Environment: ${config.environment}`)
  console.log(`👉  Production: ${config.production}`)
})
