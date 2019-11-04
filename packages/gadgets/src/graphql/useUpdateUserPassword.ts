import { createUseServer } from '../hooks/useServer'

export const useUpdateUserPassword = createUseServer<
  {
    value: {
      passwordCurrent: string
      passwordNew: string
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
  name: 'UpdateUserPassword',
  query: `
    mutation UpdateUserPassword($value: UpdateUserPasswordValue!) {
      user: UpdateUserPassword(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
