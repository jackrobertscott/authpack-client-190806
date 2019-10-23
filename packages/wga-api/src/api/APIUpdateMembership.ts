import { generate } from '../utils/generate'

export const APIUpdateMembership = generate<
  {
    id: string
    value: {
      meta?: { [key: string]: any }
    }
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
  name: 'APIUpdateMembership',
  query: `
    mutation APIUpdateMembership($id: String!, $value: APIUpdateMembershipValue!) {
      membership: APIUpdateMembership(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
