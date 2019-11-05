import { createUseServer } from '../hooks/useServer'

export const useRemoveMembership = createUseServer<
  {
    id: string
  },
  {
    membership: {
      id: string
    }
  }
>({
  name: 'RemoveMembership',
  query: `
    mutation RemoveMembership($id: String!) {
      membership: RemoveMembership(id: $id) {
        id
      }
    }
  `,
})
