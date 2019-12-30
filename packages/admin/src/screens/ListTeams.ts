import faker from 'faker'
import {
  createElement as element,
  FC,
  useState,
  useEffect,
  useRef,
} from 'react'
import { Page, Table, Empty, Button, drip } from '@authpack/theme'
import { format } from 'date-fns'
import { RouterManagerTeam } from './RouterManagerTeam'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListTeams: FC = () => {
  const gqlListTeams = useListTeams()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({
    options: { sort: 'created' },
  })
  const queryListTeams = useRef(drip(1000, gqlListTeams.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListTeams.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newTeam = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListTeams.data && gqlListTeams.data.count
      ? gqlListTeams.data.teams
      : variables.phrase ||
        Boolean(gqlListTeams.data && !gqlListTeams.data.teams)
      ? []
      : FakeTeams
  return element(Page, {
    title: 'Teams',
    subtitle: 'Groups of users',
    hidden: !gqlListTeams.data || !gqlListTeams.data.count,
    corner: {
      icon: 'plus',
      label: 'New Team',
      click: newTeam,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListTeams.data && gqlListTeams.data.count,
      current: gqlListTeams.data && gqlListTeams.data.teams.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerTeam, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListTeams.current(variables)
          if (id) {
            idcurrentChange(id)
          } else {
            buildChange(false)
            setTimeout(() => idcurrentChange(undefined), 200) // animation
          }
        },
        close: () => {
          buildChange(false)
          setTimeout(() => idcurrentChange(undefined), 200) // animation
        },
      }),
      gqlListTeams.data &&
        !gqlListTeams.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'users',
          label: 'Teams',
          helper: 'Would you like to create a team?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Team',
            click: newTeam,
          }),
        }),
      gqlListTeams.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'name', label: 'Name' },
            { key: 'tag', label: 'Tag' },
            { key: 'description', label: 'Description' },
            { key: 'updated', label: 'Updated' },
            { key: 'created', label: 'Created' },
          ].map(({ key, label }) => ({
            label,
            icon:
              variables.options && variables.options.sort === key
                ? variables.options.reverse
                  ? 'chevron-down'
                  : 'chevron-up'
                : 'equals',
            click: () =>
              variablesChange({
                ...variables,
                options: {
                  ...variables.options,
                  sort: key,
                  reverse: !variables.options.reverse,
                },
              }),
          })),
          rows: list.map(data => ({
            id: data.id,
            click: () => {
              idcurrentChange(data.id)
              buildChange(true)
            },
            cells: [
              { icon: 'users', value: data.name },
              { icon: 'fingerprint', value: data.tag || '...' },
              { icon: 'book', value: data.description || '...' },
              {
                icon: 'clock',
                value: format(new Date(data.updated), 'dd LLL h:mm a'),
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListTeams = createUseServer<{
  count: number
  teams: Array<{
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListTeams($phrase: String, $options: WhereOptions) {
      count: CountTeams(phrase: $phrase)
      teams: ListTeams(phrase: $phrase, options: $options) {
        id
        created
        updated
        name
        tag
        description
      }
    }
  `,
})

const FakeTeams: Array<{
  id: string
  created: string
  updated: string
  name: string
  tag: string
  description?: string
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  updated: faker.date.recent(100).toDateString(),
  name: faker.random.words(2),
  tag: faker.internet.userName(),
  description: faker.random.words(5),
}))
