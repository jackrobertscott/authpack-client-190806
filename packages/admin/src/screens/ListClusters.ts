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
import { RouterManagerCluster } from './RouterManagerCluster'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListClusters: FC = () => {
  const gqlListClusters = useListClusters()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({
    options: { sort: 'created' },
  })
  const queryListClusters = useRef(drip(1000, gqlListClusters.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListClusters.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newCluster = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListClusters.data && gqlListClusters.data.count
      ? gqlListClusters.data.clusters
      : variables.phrase ||
        Boolean(gqlListClusters.data && !gqlListClusters.data.clusters)
      ? []
      : FakeClusters
  return element(Page, {
    title: 'Clusters',
    subtitle: 'Collections of data',
    hidden: !gqlListClusters.data || !gqlListClusters.data.count,
    corner: {
      icon: 'plus',
      label: 'New Cluster',
      click: newCluster,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListClusters.data && gqlListClusters.data.count,
      current: gqlListClusters.data && gqlListClusters.data.clusters.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerCluster, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListClusters.current(variables)
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
      gqlListClusters.data &&
        !gqlListClusters.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'users',
          label: 'Clusters',
          helper: 'Would you like to create a cluster?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Cluster',
            click: newCluster,
          }),
        }),
      gqlListClusters.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'name', label: 'Name' },
            { key: 'count_users', label: 'Users' },
            { key: 'count_teams', label: 'Teams' },
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
              { icon: 'tag', value: data.name },
              { icon: 'users', value: String(data.count_users) || '...' },
              { icon: 'handshake', value: String(data.count_teams) || '...' },
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

const useListClusters = createUseServer<{
  count: number
  clusters: Array<{
    id: string
    created: string
    updated: string
    name: string
    count_users: number
    count_teams: number
  }>
}>({
  query: `
    query ListClusters($phrase: String, $options: WhereOptions) {
      count: CountClusters(phrase: $phrase)
      clusters: ListClusters(phrase: $phrase, options: $options) {
        id
        created
        updated
        name
        count_users
        count_teams
      }
    }
  `,
})

const FakeClusters: Array<{
  id: string
  created: string
  updated: string
  name: string
  count_users: number
  count_teams: number
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  updated: faker.date.recent(100).toDateString(),
  name: faker.random.words(2),
  count_users: faker.random.number(1000000),
  count_teams: faker.random.number(1000000),
}))
