import { generate } from '../utils/generate'

export const APICountCredentials = generate<
  {
    filter?: {
      id?: string
      user?: string
      provider?: string
    }
  },
  {
    count: number
  }
>({
  name: 'APICountCredentials',
  query: `
    query APICountCredentials($filter: FilterCredentials) {
      count: APICountCredentials(filter: $filter)
    }
  `,
})
