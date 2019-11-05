import { createUseServer } from '../hooks/useServer'

export const useRemoveCredential = createUseServer<
  {
    id: string
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      access_token: string
      email?: string
    }
  }
>({
  name: 'RemoveCredential',
  query: `
    mutation RemoveCredential($id: String!) {
      credential: RemoveCredential(id: $id) {
        id
        created
        updated
        meta
        access_token
        email
      }
    }
  `,
})
