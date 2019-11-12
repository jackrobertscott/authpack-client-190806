import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, Focus, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerUser } from '../routers/RouterManagerUser'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListUsers: FC = () => {
  const apiListUsers = useListUsers()
  const [build, buildChange] = useState<boolean>(false)
  const [ready, readyChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{ [key: string]: any }>({})
  const query = useRef(drip(500, data => apiListUsers.fetch(data)))
  useEffect(() => {
    if (variables) query.current(variables)
    // eslint-disable-next-line
  }, [variables])
  useEffect(() => {
    if (apiListUsers.data && apiListUsers.data.users && !ready)
      readyChange(true)
    // eslint-disable-next-line
  }, [apiListUsers.data])
  const list =
    apiListUsers.data && apiListUsers.data.users
      ? apiListUsers.data.users
      : FakeUsers
  return create(Page, {
    title: 'Users',
    subtitle: 'See all users of your app',
    hidden: !apiListUsers.data,
    corner: {
      icon: 'plus',
      label: 'Create User',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: apiListUsers.data && apiListUsers.data.count,
      showing: apiListUsers.data && apiListUsers.data.users.length,
      change: (search, limit, skip) => {
        variablesChange({
          regex: search,
          options: { ...(variables.options || {}), limit, skip },
        })
      },
    }),
    children: [
      create(RouterManagerUser, {
        key: 'router',
        id: idcurrent,
        change: id => {
          idcurrentChange(id)
          if (variables) query.current(variables)
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
          { key: 'email', label: 'Email' },
          { key: 'name', label: 'Name' },
          { key: 'username', label: 'Username' },
          { key: 'updated', label: 'Updated' },
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
            { icon: 'at', value: data.email },
            { icon: 'user', value: data.name || '...' },
            { icon: 'tags', value: data.username || '...' },
            {
              icon: 'clock',
              value: format(new Date(data.updated), 'dd LLL yyyy'),
            },
          ],
        })),
      }),
      !ready
        ? create(Focus, {
            key: 'loading',
            icon: 'sync-alt',
            label: 'Loading',
          })
        : !apiListUsers.data &&
          create(Empty, {
            key: 'empty',
            icon: 'users',
            label: 'Users',
            helper: 'Create a user manually or by using the Authenticator API',
            children: create(Button, {
              key: 'Regular',
              label: 'See API',
              click: () => window.open('https://windowgadgets.io'),
            }),
          }),
    ],
  })
}

const useListUsers = createUseServer<{
  count: number
  users: Array<{
    id: string
    updated: string
    email: string
    username?: string
    name?: string
  }>
}>({
  query: `
    query apiListUsers($regex: String, $options: WhereOptions) {
      count: apiCountUsers(regex: $regex)
      users: apiListUsers(regex: $regex, options: $options) {
        id
        updated
        email
        username
        name
      }
    }
`,
})

const FakeUsers: Array<{
  id: string
  updated: string
  email: string
  username?: string
  name?: string
}> = Array.from(Array(10).keys()).map(() => ({
  id: faker.random.uuid(),
  updated: faker.date.recent(100).toDateString(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  name: faker.name.findName(),
}))
