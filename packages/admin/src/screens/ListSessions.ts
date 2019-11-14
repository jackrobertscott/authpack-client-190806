import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, Focus, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerSession } from '../routers/RouterManagerSession'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListSessions: FC = () => {
  const apiListSessions = useListSessions()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{ [key: string]: any }>({})
  const queryListSessions = useRef(drip(1000, apiListSessions.fetch))
  useEffect(() => {
    if (variables) queryListSessions.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    apiListSessions.data && apiListSessions.data.count
      ? apiListSessions.data.sessions
      : FakeSessions
  return create(Page, {
    title: 'Sessions',
    subtitle: 'See all sessions of your app',
    hidden: !apiListSessions.data || !apiListSessions.data.count,
    corner: {
      icon: 'plus',
      label: 'Create Session',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: apiListSessions.data && apiListSessions.data.count,
      current: apiListSessions.data && apiListSessions.data.sessions.length,
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
              value: data.user.name || data.user.username || data.user.email,
            },
            {
              icon: 'users',
              value: data.team ? `${data.team.name} (${data.team.tag})` : '...',
            },
            {
              icon: 'clock',
              value: format(new Date(data.created), 'dd LLL yyyy @ h:mm a'),
            },
          ],
        })),
      }),
      !apiListSessions.data
        ? create(Focus, {
            key: 'loading',
            icon: 'sync-alt',
            label: 'Loading',
          })
        : !apiListSessions.data.count &&
          create(Empty, {
            key: 'empty',
            icon: 'sessions',
            label: 'Sessions',
            helper:
              'Create a session manually or by using the Authenticator API',
            children: create(Button, {
              key: 'Regular',
              label: 'See API',
              click: () => window.open('https://windowgadgets.io'),
            }),
          }),
    ],
  })
}

const useListSessions = createUseServer<{
  count: number
  sessions: Array<{
    id: string
    created: string
    user: {
      name: string
      username: string
      email: string
    }
    team?: {
      name: string
      tag: string
    }
  }>
}>({
  query: `
    query apiListSessions($options: WhereOptions) {
      count: apiCountSessions
      sessions: apiListSessions(options: $options) {
        id
        created
        user {
          name
          username
          email
        }
        team {
          name
          tag
        }
      }
    }
  `,
})

const FakeSessions: Array<{
  id: string
  created: string
  user: {
    name: string
    username: string
    email: string
  }
  team?: {
    name: string
    tag: string
  }
}> = Array.from(Array(10).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  user: {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    name: faker.name.findName(),
  },
  team: {
    name: faker.random.words(2),
    tag: faker.internet.userName(),
    description: faker.random.words(10),
  },
}))
