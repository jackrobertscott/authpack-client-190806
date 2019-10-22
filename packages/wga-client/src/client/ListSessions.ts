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
    }>
  }
>({
  name: 'ListSessions',
  query: `
    query ListSessions($options: OptionsList) {
      sessions: ListSessions(options: $options) {
        id
      }
    }
  `,
})
