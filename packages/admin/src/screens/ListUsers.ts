import { createElement as create, FC, useState, useEffect } from 'react'
import { Page, SearchBar, usePaginator, Table } from 'wga-theme'
import { useConfig } from '../hooks/useConfig'
import { RouterManagerUser } from '../routers/RouterManagerUser'
import { createUseServer } from '../hooks/useServer'

export const ListUsers: FC = () => {
  const config = useConfig()
  const gql = useAPIListUsers()
  const paginator = usePaginator({
    count: gql.data && gql.data.count,
  })
  const [build, buildChange] = useState<boolean>(false)
  const [search, searchChange] = useState<string>('')
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [sort, sortChange] = useState<string | undefined>()
  useEffect(() => {
    gql.fetch({
      options: {
        limit: paginator.limit,
        skip: paginator.skip,
        sort,
      },
    })
    // eslint-disable-next-line
  }, [paginator, sort])
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
    children: [
      create(Table, {
        key: 'table',
        header: [
          { key: 'id', label: 'Id' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
        ].map(({ key, label }) => ({
          label,
          icon: sort === key ? 'chevron-down' : 'equals',
          click: () => sortChange(key),
        })),
        rows: gql.data
          ? gql.data.users.map(data => ({
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
      create(RouterManagerUser, {
        key: 'router',
        id: idcurrent,
        change: idcurrentChange,
        close: () => buildChange(false),
        visible: build,
      }),
    ],
    noscroll: create(SearchBar, {
      value: search,
      change: searchChange,
      devmode: config.state.devmode,
      options: [
        {
          icon: 'angle-double-left',
          label: 'Previous',
          click: paginator.previous,
          disabled: !paginator.hasPrevious,
        },
        {
          icon: 'angle-double-right',
          label: 'Next',
          click: paginator.next,
          disabled: !paginator.hasNext,
        },
      ],
    }),
  })
}

export const useAPIListUsers = createUseServer<
  {
    filter?: {}
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    count: number
    users: Array<{
      id: string
      updated: string
      email: string
      username?: string
      name?: string
    }>
  }
>({
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
