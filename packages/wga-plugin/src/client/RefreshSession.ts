import { generate } from '../utils/generate'

export const RefreshSession = generate<
  {},
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
    mutation RefreshSession {
      session: RefreshSession {
        id
        created
        updated
        meta
      }
    }
  `,
})
