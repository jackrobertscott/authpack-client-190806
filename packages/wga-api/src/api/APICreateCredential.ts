import { generate } from '../utils/generate'

export const APICreateCredential = generate<
  {
    value: {
      user: string
      provider: string
      token: string
      identifier: string
      meta?: { [key: string]: any }
    }
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APICreateCredential',
  query: `
    query APICreateCredential($value: APICreateCredentialValue!) {
      credential: APICreateCredential(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
