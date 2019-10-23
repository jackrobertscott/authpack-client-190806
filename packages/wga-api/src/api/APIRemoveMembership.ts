import { generate } from '../utils/generate'

export const APIRemoveMembership = generate<
  {
    id: string
  },
  {
    membership: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRemoveMembership',
  query: `
    mutation APIRemoveMembership($id: String!) {
      membership: APIRemoveMembership(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
