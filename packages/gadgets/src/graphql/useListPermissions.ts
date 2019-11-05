import { createUseServer } from '../hooks/useServer'

export const useListPermissions = createUseServer<
  {},
  {
    permissions: Array<{
      id: string
    }>
  }
>({
  name: 'ListPermissions',
  query: `
    query ListPermissions {
      permissions: ListPermissions {
        id
      }
    }
  `,
})
