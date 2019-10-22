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
    }
  }
>({
  name: 'RetrieveSession',
  query: `
    query RetrieveSession($value: RetrieveSessionValue) {
      session: RetrieveSession(value: $value) {
        id
      }
    }
  `,
})
