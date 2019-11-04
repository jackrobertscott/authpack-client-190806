import { createUseServer } from '../hooks/useServer'

export const useRemoveMembership = createUseServer<
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
  name: 'RemoveMembership',
  query: `
    mutation RemoveMembership($id: String!) {
      membership: RemoveMembership(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
