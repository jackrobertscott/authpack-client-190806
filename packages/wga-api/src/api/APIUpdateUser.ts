import { generate } from '../utils/generate'

export const APIUpdateUser = generate<
  {
    filter: {
      id?: string
    }
    value: {
      meta?: { [key: string]: any }
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
  name: 'APIUpdateUser',
  query: `
    query APIUpdateUser($filter: FilterUsers!, $value: APIUpdateUserValue!) {
      user: APIUpdateUser(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
