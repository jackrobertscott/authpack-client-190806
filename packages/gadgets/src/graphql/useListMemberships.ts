import { createUseServer } from '../hooks/useServer'

export const useListMemberships = createUseServer<
  {},
  {
    memberships: Array<{
      id: string
    }>
  }
>({
  name: 'ListMemberships',
  query: `
    query ListMemberships {
      memberships: ListMemberships {
        id
      }
    }
  `,
})
