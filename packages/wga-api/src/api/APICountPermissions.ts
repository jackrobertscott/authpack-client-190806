import { generate } from '../utils/generate'

export const APICountPermissions = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    count: number
  }
>({
  name: 'APICountPermissions',
  query: `
    query APICountPermissions($filter: FilterPermissions) {
      count: APICountPermissions(filter: $filter)
    }
  `,
})
