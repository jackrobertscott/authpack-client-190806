import { generate } from '../utils/generate'

export const UpdateUser = generate<
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
  name: 'UpdateUser',
  query: `
    mutation UpdateUser($value: UpdateUserValue) {
      user: UpdateUser(value: $value) {
        id
      }
    }
  `,
})
