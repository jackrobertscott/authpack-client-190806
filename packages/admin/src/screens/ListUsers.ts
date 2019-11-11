import faker from 'faker'
import { createElement as create, FC, useState, useEffect } from 'react'
import { Page, Table, Empty, Button } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerUser } from '../routers/RouterManagerUser'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListUsers: FC = () => {
  const apiListUsers = useListUsers()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [options, optionsChange] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    apiListUsers.fetch({ options })
    // eslint-disable-next-line
  }, [])
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
        idcurrentChange(undefined)
        buildChange(true)
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: apiListUsers.data && apiListUsers.data.count,
      showing: apiListUsers.data && apiListUsers.data.users.length,
      change: (search, limit, skip) => {
        optionsChange({
          limit,
          skip,
        })
      },
    }),
    children: [
      create(RouterManagerUser, {
        key: 'router',
        id: idcurrent,
        change: idcurrentChange,
        close: () => buildChange(false),
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
          icon: options.sort === key ? 'chevron-down' : 'equals',
          click: () => optionsChange(data => ({ ...data, sort: key })),
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
      !apiListUsers.data &&
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
    query apiListUsers($filter: FilterUsers, $options: FilterOptions) {
      count: apiCountUsers(filter: $filter)
      users: apiListUsers(filter: $filter, options: $options) {
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
