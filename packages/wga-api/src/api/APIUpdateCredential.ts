import { generate } from '../utils/generate'

export const APIUpdateCredential = generate<
  {
    filter: {
      id?: string
    }
    value: {
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
  name: 'APIUpdateCredential',
  query: `
    query APIUpdateCredential($filter: FilterCredentials!, $value: APIUpdateCredentialValue!) {
      credential: APIUpdateCredential(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
