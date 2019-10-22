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
      created: string
      updated: string
      meta: { [key: string]: any }
      token: string
      identifier: string
    }>
  }
>({
  name: 'ListCredentials',
  query: `
    query ListCredentials($options: OptionsList) {
      credentials: ListCredentials(options: $options) {
        id
        created
        updated
        meta
        token
        identifier
      }
    }
  `,
})
