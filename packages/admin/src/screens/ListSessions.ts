import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, drip } from '@authpack/theme'
import { format } from 'date-fns'
import { RouterManagerSession } from './RouterManagerSession'
import { createUseServer } from '../hooks/useServer'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'

export const ListSessions: FC<{ user_id?: string }> = ({ user_id }) => {
  const gqlListSessions = useListSessions()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    where: { user_id?: string }
    options: { [key: string]: any }
  }>({ where: { user_id }, options: { sort: 'created' } })
  const queryListSessions = useRef(drip(1000, gqlListSessions.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListSessions.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListSessions.data && gqlListSessions.data.count
      ? gqlListSessions.data.sessions
      : Boolean(gqlListSessions.data && !gqlListSessions.data.sessions)
      ? []
      : FakeSessions
  return create(Page, {
    title: 'Sessions',
    subtitle: 'User',
    hidden: !gqlListSessions.data || !gqlListSessions.data.count,
    noscroll: create(TemplateSearchBar, {
      input: false,
      count: gqlListSessions.data && gqlListSessions.data.count,
      current: gqlListSessions.data && gqlListSessions.data.sessions.length,
      change: (_, limit, skip) =>
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
        }),
    }),
    children: [
      create(RouterManagerSession, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListSessions.current(variables)
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
      gqlListSessions.data &&
        !gqlListSessions.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'history',
          label: 'Sessions',
          helper: 'Sessions are created when a user logs into your app',
        }),
      gqlListSessions.data &&
        create(Table, {
          key: 'table',
          header: [
            { key: 'team_id', label: 'Team' },
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
              {
                icon: 'users',
                value: data.team ? data.team.summary : '...',
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL yy @ h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListSessions = createUseServer<{
  count: number
  sessions: Array<{
    id: string
    created: string
    team?: {
      summary: string
    }
  }>
}>({
  query: `
    query ListSessions($where: WhereSessions!, $options: WhereOptions) {
      count: CountSessions(where: $where)
      sessions: ListSessions(where: $where, options: $options) {
        id
        created
        team {
          summary
        }
      }
    }
  `,
})

const FakeSessions: Array<{
  id: string
  created: string
  team?: {
    summary: string
  }
}> = Array.from(Array(5).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  team: {
    summary: faker.random.words(2),
  },
}))
