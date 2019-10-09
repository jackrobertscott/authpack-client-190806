import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { createUseGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerSessions } from '../routers/RouterManagerSessions'

export type ListSessions = {}

export const ListSessions: FC<ListSessions> = () => {
  // prepare the modal state
  const [modal, changeModal] = useState<{ open: boolean; id?: string }>({
    open: false,
  })
  // load the sessions and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const listSessions = useListSessions()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listSessions.data && listSessions.data.count,
  })
  const listSessionsFetch = () => {
    listSessions.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listSessionsFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Sessions',
    description: 'See all the sessions who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Session',
      click: () => changeModal({ open: true, id: undefined }),
    },
    noscroll: [
      create(RouterManagerSessions, {
        key: 'modal',
        close: () => changeModal({ open: false, id: undefined }),
        change: listSessionsFetch,
        ...modal,
      }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listSessions.data && listSessions.data.sessions.length,
        total: listSessions.data && listSessions.data.count,
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
          listSessions.data &&
          listSessions.data.sessions.map(session =>
            create(List.Row, {
              key: session.id,
              click: () => changeModal({ open: true, id: session.id }),
              children: [
                create(List.Cell, {
                  key: 'Email',
                  label: 'Email',
                  icon: 'inbox',
                  value: session.user && session.user.email,
                }),
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'user',
                  value: session.user && session.user.name,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(session.updated), 'dd LLL yyyy'),
                  end: true,
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListSessions = createUseGraph<{
  count: number
  sessions: Array<{
    id: string
    updated: string
    user?: {
      id: string
      email: string
      name?: string
    }
  }>
}>({
  name: 'ListSessions',
  query: `
    query ListSessions($count: CountSessionsOptions, $list: ListSessionsOptions) {
      count: CountSessions(options: $count)
      sessions: ListSessions(options: $list) {
        id
        updated
        user {
          id
          email
          name
        }
      }
    }
  `,
})
