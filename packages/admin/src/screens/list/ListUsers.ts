import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../../templates/Searchbar'
import { createUseGraph } from '../../hooks/useGraph'
import { usePagination } from '../../hooks/usePagination'
import { RouterManagerUsers } from '../../routers/RouterManagerUsers'

export type IListUsers = {}

export const ListUsers: FC<IListUsers> = () => {
  // load the users and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listUser = useListUser()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listUser.data && listUser.data.count,
  })
  const listUserFetch = () => {
    listUser.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listUserFetch()
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
      typeof current === 'string' &&
        create(RouterManagerUsers, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: listUserFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listUser.data && listUser.data.users.length,
        total: listUser.data && listUser.data.count,
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
          listUser.data &&
          listUser.data.users.map(user =>
            create(List.Row, {
              key: user.id,
              click: () => currentChange(user.id),
              children: [
                create(List.Cell, {
                  key: 'Email',
                  label: 'Email',
                  icon: 'inbox',
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
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListUser = createUseGraph<{
  count: number
  users: Array<{
    id: string
    updated: string
    email: string
    username?: string
    name?: string
  }>
}>({
  api: true,
  query: `
    query ListUser($count: CountUserOptions, $list: ListUserOptions) {
      count: CountUser(options: $count)
      users: ListUser(options: $list) {
        id
        updated
        email
        username
        name
      }
    }
  `,
})
