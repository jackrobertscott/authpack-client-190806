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
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'RefreshSession',
  query: `
    mutation RefreshSession($value: RefreshSessionValue) {
      session: RefreshSession(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
