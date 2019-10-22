import { generate } from '../utils/generate'

export const RefreshCredential = generate<
  {
    value: {
      // todo...
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
  name: 'RefreshCredential',
  query: `
    mutation RefreshCredential($value: RefreshCredentialValue) {
      credential: RefreshCredential(value: $value) {
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
