import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { useGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerAccounts } from '../routers/RouterManagerAccounts'

export type IPageAccounts = {}

export const PageAccounts: FC<IPageAccounts> = () => {
  const listAccountGraph = useGraph<{
    count: number
    accounts: Array<{
      id: string
      updated: string
      email: string
      username?: string
      name?: string
    }>
  }>({
    api: true,
    query: `
      query ListAccount($count: CountAccountOptions, $list: ListAccountOptions) {
        count: CountAccount(options: $count)
        accounts: ListAccount(options: $list) {
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
    count: listAccountGraph.data && listAccountGraph.data.count,
  })
  const load = () =>
    listAccountGraph.fetch({ count: { search }, list: { search, limit, skip } })
  useEffect(() => {
    load()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Accounts',
    description: 'See all the users who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Account',
      click: () => currentChange(''),
    },
    noscroll: [
      typeof current === 'string' &&
        create(RouterManagerAccounts, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: load,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listAccountGraph.data && listAccountGraph.data.accounts.length,
        total: listAccountGraph.data && listAccountGraph.data.count,
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
          listAccountGraph.data &&
          listAccountGraph.data.accounts.map(account =>
            create(List.Row, {
              key: account.id,
              click: () => currentChange(account.id),
              children: [
                create(List.Cell, {
                  key: 'Id',
                  label: 'Id',
                  icon: 'fingerprint',
                  value: account.id,
                }),
                create(List.Cell, {
                  key: 'Email',
                  label: 'Email',
                  icon: 'inbox',
                  value: account.email,
                }),
                create(List.Cell, {
                  key: 'Username',
                  label: 'Username',
                  icon: 'tags',
                  value: account.username,
                }),
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'user',
                  value: account.name,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(account.updated), 'dd LLL yyyy'),
                }),
              ],
            })
          ),
      }),
    ],
  })
}
