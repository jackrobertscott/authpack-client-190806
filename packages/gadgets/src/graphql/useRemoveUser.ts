import { createUseServer } from '../hooks/useServer'

export const useRemoveUser = createUseServer<
  {
    value:
      | object
      | {
          password: string
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
  name: 'RemoveUser',
  query: `
    mutation RemoveUser($value: RemoveUserValue!) {
      user: RemoveUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
