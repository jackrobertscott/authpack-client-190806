import { generate } from '../utils/generate'

export const RefreshSession = generate<
  {
    value: {
      // todo...
    }
  },
  {
    session: {
      id: string
    }
  }
>({
  name: 'RefreshSession',
  query: `
    mutation RefreshSession($value: RefreshSessionValue) {
      session: RefreshSession(value: $value) {
        id
      }
    }
  `,
})
