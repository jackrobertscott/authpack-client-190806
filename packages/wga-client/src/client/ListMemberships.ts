import { generate } from '../utils/generate'

export const ListMemberships = generate<
  {
    options: {
      // todo...
    }
  },
  {
    memberships: Array<{
      id: string
    }>
  }
>({
  name: 'ListMemberships',
  query: `
    query ListMemberships($options: OptionsList) {
      memberships: ListMemberships(options: $options) {
        id
      }
    }
  `,
})
