import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'

export const APICreateCredential = generate<
  {
    value: {
      meta?: IMeta
      user: string
      provider: string
      token: string
      email?: string
    }
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: IMeta
      user: string
      provider: string
      token: string
      email?: string
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
        user
        provider
        token
        email
      }
    }
  `,
})
