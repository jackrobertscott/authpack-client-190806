import * as HttpStatus from 'http-status-codes'
import micro, { RequestHandler, json } from 'micro'
import { graphql } from 'graphql'
import { config } from './config'
import { schema } from './schema'
import { gqlcors } from './utils/gqlcors'

const handler: RequestHandler = async req => {
  if (req.method === 'OPTIONS') {
    return {}
  }
  const body: any = await json(req)
  const context: any = { headers: req.headers }
  if (typeof body.query !== 'string' || body.query.length > 3000) {
    throw new Error(
      `${HttpStatus.BAD_REQUEST}: GraphQL query must be less than 3000 characters`
    )
  }
  return graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
    operationName: body.operationName,
    contextValue: context,
  })
}

export default micro(gqlcors()(handler)).listen(config.port, () => {
  console.log(`👉  Server: http://localhost:${config.port}`)
  console.log(`👉  Environment: ${config.environment}`)
  console.log(`👉  Production: ${config.production}`)
})
