import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { createUseGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerUsers } from '../routers/RouterManagerUsers'

export type IListUsers = {}

export const ListUsers: FC<IListUsers> = () => {
  // load the users and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listUsers = useListUsers()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listUsers.data && listUsers.data.count,
  })
  const listUsersFetch = () => {
    listUsers.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listUsersFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Users',
    description: 'See all the users who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create User',
      click: () => currentChange(''),
    },
    noscroll: [
      create(RouterManagerUsers, {
        key: 'modal',
        id: current,
        close: () => currentChange(undefined),
        change: listUsersFetch,
      }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listUsers.data && listUsers.data.users.length,
        total: listUsers.data && listUsers.data.count,
        previous: hasPrevious() ? () => previous() : undefined,
        next: hasNext() ? () => next() : undefined,
        change: phrase => {
          if (phrase !== search) searchChange(phrase)
        },
      }),
    ],
    scroll: [
      create(List.Container, {
        key: 'list',
        children:
          listUsers.data &&
          listUsers.data.users.map(user =>
            create(List.Row, {
              key: user.id,
              click: () => currentChange(user.id),
              children: [
                create(List.Cell, {
                  key: 'Email',
                  label: 'Email',
                  icon: 'at',
                  value: user.email,
                }),
                create(List.Cell, {
                  key: 'Username',
                  label: 'Username',
                  icon: 'tags',
                  value: user.username,
                }),
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'user',
                  value: user.name,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(user.updated), 'dd LLL yyyy'),
                  end: true,
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListUsers = createUseGraph<{
  count: number
  users: Array<{
    id: string
    updated: string
    email: string
    username?: string
    name?: string
  }>
}>({
  name: 'ListUsers',
  query: `
    query ListUsers($count: CountUsersOptions, $list: ListUsersOptions) {
      count: CountUsers(options: $count)
      users: ListUsers(options: $list) {
        id
        updated
        email
        username
        name
      }
    }
  `,
})
