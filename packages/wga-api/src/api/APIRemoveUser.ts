import { generate } from '../utils/generate'

export const APIRemoveUser = generate<
  {
    filter: {
      id?: string
    }
  },
  {
    user: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRemoveUser',
  query: `
    query APIRemoveUser($filter: FilterUsers!) {
      user: APIRemoveUser(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
