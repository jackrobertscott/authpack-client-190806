import { createUseServer } from '../hooks/useServer'

export const useCreateCredential = createUseServer<
  {
    value:
      | object
      | {
          provider_id: string
          code: string
          meta?: { [key: string]: any }
        }
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
  name: 'CreateCredential',
  query: `
    mutation CreateCredential($value: CreateCredentialValue!) {
      credential: CreateCredential(value: $value) {
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
