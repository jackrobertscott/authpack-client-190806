import { createUseServer } from '../hooks/useServer'

export const useRemoveCredential = createUseServer<
  {
    id: string
  },
  {
    credential: {
      id: string
    }
  }
>({
  name: 'RemoveCredential',
  query: `
    mutation RemoveCredential($id: String!) {
      credential: RemoveCredential(id: $id) {
        id
      }
    }
  `,
})
