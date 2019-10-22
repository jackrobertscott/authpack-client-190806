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
    }
  }
>({
  name: 'RefreshCredential',
  query: `
    mutation RefreshCredential($value: RefreshCredentialValue) {
      credential: RefreshCredential(value: $value) {
        id
      }
    }
  `,
})
