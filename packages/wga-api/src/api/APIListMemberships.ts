import { generate } from '../utils/generate'

export const APIListMemberships = generate<
  {
    filter?: {
      id?: string
    }
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    memberships: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'APIListMemberships',
  query: `
    query APIListMemberships($filter: FilterMemberships, $options: OptionsList) {
      memberships: APIListMemberships(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
