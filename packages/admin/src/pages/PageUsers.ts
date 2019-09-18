import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { useGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerUsers } from '../routers/RouterManagerUsers'

export type IPageUsers = {}

export const PageUsers: FC<IPageUsers> = () => {
  const listUserGraph = useGraph<{
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
  const [current, currentChange] = useState<string | undefined>()
  const [search, searchChange] = useState<string>('')
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listUserGraph.data && listUserGraph.data.count,
  })
  const load = () =>
    listUserGraph.fetch({ count: { search }, list: { search, limit, skip } })
  useEffect(() => {
    load()
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
          change: load,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listUserGraph.data && listUserGraph.data.users.length,
        total: listUserGraph.data && listUserGraph.data.count,
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
          listUserGraph.data &&
          listUserGraph.data.users.map(user =>
            create(List.Row, {
              key: user.id,
              click: () => currentChange(user.id),
              children: [
                create(List.Cell, {
                  key: 'Id',
                  label: 'Id',
                  icon: 'fingerprint',
                  value: user.id,
                }),
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
