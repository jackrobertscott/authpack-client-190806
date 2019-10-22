import { generate } from '../utils/generate'

export const ListProviders = generate<
  {
    options: {
      // todo...
    }
  },
  {
    providers: Array<{
      id: string
    }>
  }
>({
  name: 'ListProviders',
  query: `
    query ListProviders($options: OptionsList) {
      providers: ListProviders(options: $options) {
        id
      }
    }
  `,
})
