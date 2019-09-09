import { createGraph, IGraph } from '../utils/graph'

export type ISession = {
  id: string
  created: Date
  updated: Date
}

export type ISessionCreate = {
  meta?: string
}

export type ISessionUpdate = {
  meta?: string
}

export const fieldsOfSession = `
  id
  created
  updated
`

export type IGraphSessions = IGraph<ISession, ISessionUpdate, ISessionCreate>

export const createSessions = (authorization: string) => {
  return createGraph<ISession, ISessionUpdate, ISessionCreate>({
    name: 'Session',
    fields: fieldsOfSession,
    authorization,
  })
}
