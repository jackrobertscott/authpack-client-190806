import { generate } from '../utils/generate'

export const CreateCredential = generate<
  {
    value: {
      // todo...
    }
  },
  {
    credential: {
      id: string
    }
  }
>({
  name: 'CreateCredential',
  query: `
    mutation CreateCredential($value: CreateCredentialValue) {
      credential: CreateCredential(value: $value) {
        id
      }
    }
  `,
})
