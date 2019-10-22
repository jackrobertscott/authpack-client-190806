import { generate } from '../utils/generate'

export const RemoveCredential = generate<
  {
    filter: {
      id?: string
      user?: string
      provider?: string
    }
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      token: string
      identifier: string
    }
  }
>({
  name: 'RemoveCredential',
  query: `
    mutation RemoveCredential($filter: FilterCredentials!) {
      credential: RemoveCredential(filter: $filter) {
        id
        created
        updated
        meta
        token
        identifier
      }
    }
  `,
})
