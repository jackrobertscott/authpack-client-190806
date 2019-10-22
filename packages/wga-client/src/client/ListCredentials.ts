import { generate } from '../utils/generate'

export const ListCredentials = generate<
  {
    options: {
      // todo...
    }
  },
  {
    credentials: Array<{
      id: string
    }>
  }
>({
  name: 'ListCredentials',
  query: `
    query ListCredentials($options: OptionsList) {
      credentials: ListCredentials(options: $options) {
        id
      }
    }
  `,
})
