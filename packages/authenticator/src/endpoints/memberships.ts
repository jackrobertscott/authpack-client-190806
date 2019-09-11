import { createGraph, IGraph } from '../utils/graph'

export type IMembership = {
  id: string
  created: Date
  updated: Date
}

export type IMembershipCreate = {
  meta?: string
}

export type IMembershipUpdate = {
  meta?: string
}

export const fieldsOfMembership = `
  id
  created
  updated
`

export type IGraphMemberships = IGraph<
  IMembership,
  IMembershipCreate,
  IMembershipUpdate
>

export const createMemberships = (authorization: string) => {
  return createGraph<IMembership, IMembershipCreate, IMembershipUpdate>({
    name: 'Membership',
    fields: fieldsOfMembership,
    authorization,
  })
}
