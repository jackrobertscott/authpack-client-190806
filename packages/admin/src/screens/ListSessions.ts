import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerSession } from './RouterManagerSession'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListSessions: FC = () => {
  const gqlListSessions = useListSessions()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{ [key: string]: any }>({
    options: { sort: 'created' },
  })
  const queryListSessions = useRef(drip(1000, gqlListSessions.fetch))
  useEffect(() => {
    if (variables) queryListSessions.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListSessions.data && gqlListSessions.data.count
      ? gqlListSessions.data.sessions
      : variables.phrase ||
        Boolean(gqlListSessions.data && !gqlListSessions.data.sessions)
      ? []
      : FakeSessions
  return create(Page, {
    title: 'Sessions',
    subtitle: 'Usage of your app',
    hidden: !gqlListSessions.data || !gqlListSessions.data.count,
    corner: {
      icon: 'plus',
      label: 'Create Session',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: gqlListSessions.data && gqlListSessions.data.count,
      current: gqlListSessions.data && gqlListSessions.data.sessions.length,
      input: false,
      change: (_, limit, skip) => {
        variablesChange({
          options: { ...(variables.options || {}), limit, skip },
        })
      },
    }),
    children: [
      create(RouterManagerSession, {
        key: 'router',
        id: idcurrent,
        change: id => {
          if (variables) queryListSessions.current(variables)
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
        visible: build,
      }),
      gqlListSessions.data &&
        !gqlListSessions.data.count &&
        create(Empty, {
          key: 'empty',
          icon: 'history',
          label: 'Sessions',
          helper: 'Create a session manually or by using the Authenticator API',
          children: create(Button, {
            key: 'Regular',
            label: 'See API',
            click: () => window.open('https://windowgadgets.io'),
          }),
        }),
      gqlListSessions.data &&
        create(Table, {
          key: 'table',
          header: [
            { key: 'user_id', label: 'User' },
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
              variablesChange(({ options = {}, ...data }) => ({
                ...data,
                options: { ...options, sort: key, reverse: !options.reverse },
              })),
          })),
          rows: list.map(data => ({
            id: data.id,
            click: () => {
              idcurrentChange(data.id)
              buildChange(true)
            },
            cells: [
              {
                icon: 'user',
                value: data.user ? data.user.summary : '...',
              },
              {
                icon: 'users',
                value: data.team ? data.team.summary : '...',
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL yyyy @ h:mm a'),
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
    user?: {
      summary: string
    }
    team?: {
      summary: string
    }
  }>
}>({
  query: `
    query ListSessions($options: WhereOptions) {
      count: CountSessions
      sessions: ListSessions(options: $options) {
        id
        created
        user {
          summary
        }
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
  user?: {
    summary: string
  }
  team?: {
    summary: string
  }
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  user: {
    summary: faker.name.findName(),
  },
  team: {
    summary: faker.random.words(2),
  },
}))
