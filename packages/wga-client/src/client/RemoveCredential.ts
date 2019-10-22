import { generate } from '../utils/generate'

export const RemoveCredential = generate<
  {
    filter: {
      // todo...
    }
  },
  {
    credential: {
      id: string
    }
  }
>({
  name: 'RemoveCredential',
  query: `
    mutation RemoveCredential($filter: RemoveCredentialValue) {
      credential: RemoveCredential(filter: $filter) {
        id
      }
    }
  `,
})
