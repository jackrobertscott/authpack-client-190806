import { generate } from '../utils/generate'

export const APICreateSession = generate<
  {
    value: {
      meta?: { [key: string]: any }
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
  name: 'APICreateSession',
  query: `
    query APICreateSession($value: APICreateSessionValue!) {
      session: APICreateSession(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
