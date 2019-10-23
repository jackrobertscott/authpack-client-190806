import { generate } from '../utils/generate'

export const APIUpdateCredential = generate<
  {
    id: string
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
    mutation APIUpdateCredential($id: String!, $value: APIUpdateCredentialValue!) {
      credential: APIUpdateCredential(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
