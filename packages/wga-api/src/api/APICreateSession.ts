import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'

export const APICreateSession = generate<
  {
    value: {
      meta?: IMeta
    }
  },
  {
    session: {
      id: string
      created: string
      updated: string
      meta: IMeta
    }
  }
>({
  name: 'APICreateSession',
  query: `
    mutation APICreateSession($value: APICreateSessionValue!) {
      session: APICreateSession(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
