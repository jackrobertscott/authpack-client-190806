import { generate } from '../utils/generate'

export const UpdateUserPassword = generate<
  {
    value: {
      // todo...
    }
  },
  {
    user: {
      id: string
    }
  }
>({
  name: 'UpdateUserPassword',
  query: `
    mutation UpdateUserPassword($value: UpdateUserPasswordValue) {
      user: UpdateUserPassword(value: $value) {
        id
      }
    }
  `,
})
