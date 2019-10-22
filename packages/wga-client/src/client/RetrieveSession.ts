import { generate } from '../utils/generate'

export const RetrieveSession = generate<
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
  name: 'RetrieveSession',
  query: `
    query RetrieveSession($value: RetrieveSessionValue) {
      session: RetrieveSession(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
