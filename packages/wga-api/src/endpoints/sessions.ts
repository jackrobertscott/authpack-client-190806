import { createGraph, IGraph } from '../utils/graph'

export type ISession = {
  id: string
  created: Date
  updated: Date
}

export type ISessionCreate = {
  meta?: string
  deactivated?: boolean
}

export type ISessionUpdate = {
  meta?: string
  deactivated?: boolean
}

export const fieldsOfSession = `
  id
  created
  updated
`

export type IGraphSessions = IGraph<ISession, ISessionCreate, ISessionUpdate>

export const createSessions = (authorization: string) => {
  return createGraph<ISession, ISessionCreate, ISessionUpdate>({
    name: 'Session',
    fields: fieldsOfSession,
    authorization,
  })
}
