import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { UserFields, IUser } from '../models/User'

export const APICreateUser = generate<
  {
    value: {
      meta?: IMeta
      email: string
      password: string
      username?: string
      name?: string
    }
  },
  {
    user: IUser
  }
>({
  name: 'APICreateUser',
  query: `
    mutation APICreateUser($value: APICreateUserValue!) {
      user: APICreateUser(value: $value) {
        ${UserFields}
      }
    }
  `,
})
