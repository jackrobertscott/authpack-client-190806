import { createUseServer } from '../hooks/useServer'

export const useCreateCredential = createUseServer<
  {
    value: {
      provider_id: string
      code: string
      meta?: { [key: string]: any }
    }
  },
  {
    credential: {
      id: string
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
        access_token
        email
      }
    }
  `,
})
