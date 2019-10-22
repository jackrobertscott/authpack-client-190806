import { generate } from '../utils/generate'

export const ListSessions = generate<
  {
    options: {
      // todo...
    }
  },
  {
    sessions: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListSessions',
  query: `
    query ListSessions($options: OptionsList) {
      sessions: ListSessions(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
