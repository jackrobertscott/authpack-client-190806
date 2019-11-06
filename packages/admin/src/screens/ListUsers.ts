import { createElement as create, FC, useState, useEffect } from 'react'
import { Page, Table, Empty, Button } from 'wga-theme'
import { RouterManagerUser } from '../routers/RouterManagerUser'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListUsers: FC = () => {
  const apiListUsers = useAPIListUsers()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [options, optionsChange] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    apiListUsers.fetch({ options })
    // eslint-disable-next-line
  }, [options])
  return create(Page, {
    title: 'Users',
    subtitle: 'See all users of your app',
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
          { key: 'id', label: 'Id' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
        ].map(({ key, label }) => ({
          label,
          icon: options.sort === key ? 'chevron-down' : 'equals',
          click: () => optionsChange(data => ({ ...data, sort: key })),
        })),
        rows: apiListUsers.data
          ? apiListUsers.data.users.map(data => ({
              id: data.id,
              click: () => {
                idcurrentChange(data.id)
                buildChange(true)
              },
              cells: [
                { icon: 'at', value: data.email },
                { icon: 'user', value: data.name },
                { icon: 'tags', value: data.username },
                { icon: 'clock', value: data.updated },
              ],
            }))
          : [],
      }),
      (!apiListUsers.data || !apiListUsers.data.users.length) &&
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

const useAPIListUsers = createUseServer<{
  count: number
  users: Array<{
    id: string
    updated: string
    email: string
    username?: string
    name?: string
  }>
}>({
  name: 'APIListUsers',
  query: `
    query APIListUsers($filter: FilterUsers, $options: FilterOptions) {
      count: APICountUsers(filter: $filter)
      users: APIListUsers(filter: $filter, options: $options) {
        id
        updated
        email
        username
        name
      }
    }
`,
})
