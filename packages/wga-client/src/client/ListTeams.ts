import { generate } from '../utils/generate'

export const ListTeams = generate<
  {
    options: {
      // todo...
    }
  },
  {
    teams: Array<{
      id: string
    }>
  }
>({
  name: 'ListTeams',
  query: `
    query ListTeams($options: OptionsList) {
      teams: ListTeams(options: $options) {
        id
      }
    }
  `,
})
