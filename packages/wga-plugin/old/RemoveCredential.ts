import { generate } from '../utils/graphql'

export const RemoveCredential = generate<
  {
    id: string
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      token: string
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
        token
        email
      }
    }
  `,
})
