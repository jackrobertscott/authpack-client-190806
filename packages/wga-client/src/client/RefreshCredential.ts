import { generate } from '../utils/generate'

export const RefreshCredential = generate<
  {
    filter: {
      id?: string
      user?: string
      provider?: string
    }
    value: {
      code: string
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
    mutation RefreshCredential($filter: FilterCredentials!, $value: RefreshCredentialValue!) {
      credential: RefreshCredential(filter: $filter, value: $value) {
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
