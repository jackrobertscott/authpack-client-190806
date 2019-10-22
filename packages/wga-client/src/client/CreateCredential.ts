import { generate } from '../utils/generate'

export const CreateCredential = generate<
  {
    value: {
      provider: string
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
      token: string
      identifier: string
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
        token
        identifier
      }
    }
  `,
})
