import { createElement as create, FC, useEffect } from 'react'
import { Page, List } from 'wga-theme'
import { Searchbar } from '../templates/Searchbar'
import { useGraph } from '../hooks/useGraph'

export type IPageAccounts = {}

export const PageAccounts: FC<IPageAccounts> = () => {
  const [graph, execute] = useGraph<{
    accounts: Array<{
      id: string
      name: string
      email: string
      username: string
    }>
  }>({
    api: true,
    query: `
      query ListAccount {
        accounts: ListAccount {
          id
          name
          email
          username
        }
      }
    `,
  })
  useEffect(() => {
    execute()
  }, [execute])
  return create(Page.Container, {
    title: 'All Accounts',
    description: 'See all the users who have signed up to your app',
    children: [
      create(Searchbar, {
        key: 'searchbar',
        change: console.log,
        previous: () => console.log('previous'),
        next: () => console.log('next'),
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
                  key: 'Username',
                  label: 'Username',
                  icon: 'tags',
                  value: account.username || '...',
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
              ],
            })
          ),
      }),
    ],
  })
}
