import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { Searchbar } from '../templates/Searchbar'
import { useGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'

export type IPageAccounts = {}

export const PageAccounts: FC<IPageAccounts> = () => {
  const [graph, { execute }] = useGraph<{
    count: number
    accounts: Array<{
      id: string
      name: string
      email: string
      username: string
    }>
  }>({
    api: true,
    query: `
      query ListAccount($count: CountAccountOptions, $list: ListAccountOptions) {
        count: CountAccount(options: $count)
        accounts: ListAccount(options: $list) {
          id
          name
          email
          username
        }
      }
    `,
  })
  const [search, searchChange] = useState<string>('')
  const [
    { limit, skip },
    { next, previous, hasNext, hasPrevious },
  ] = usePagination({
    count: (graph.data && graph.data.count) || 0,
  })
  useEffect(() => {
    execute({
      count: { search },
      list: { search, limit, skip },
    })
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Accounts',
    description: 'See all the users who have signed up to your app',
    children: [
      create(Searchbar, {
        key: 'searchbar',
        change: phrase => {
          if (phrase !== search) searchChange(phrase)
        },
        previous: hasPrevious() ? () => previous() : undefined,
        next: hasNext() ? () => next() : undefined,
      }),
      create(List.Container, {
        key: 'list',
        children:
          graph.data &&
          graph.data.accounts.map(account =>
            create(List.Row, {
              key: account.id,
              click: () => console.log(account),
              children: [
                create(List.Cell, {
                  key: 'Id',
                  label: 'Id',
                  icon: 'fingerprint',
                  value: account.id,
                }),
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'user',
                  value: account.name || '...',
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
                  value: account.username || '...',
                }),
              ],
            })
          ),
      }),
    ],
  })
}
