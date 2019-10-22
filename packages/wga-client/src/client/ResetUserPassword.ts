import { generate } from '../utils/generate'

export const ResetUserPassword = generate<
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
  name: 'ResetUserPassword',
  query: `
    mutation ResetUserPassword($value: ResetUserPasswordValue) {
      user: ResetUserPassword(value: $value) {
        id
      }
    }
  `,
})
