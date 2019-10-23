import { generate } from '../utils/generate'

export const APIRetrieveMembership = generate<
  {
    id: string
  },
  {
    membership: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveMembership',
  query: `
    query APIRetrieveMembership($id: String!) {
      membership: APIRetrieveMembership(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
