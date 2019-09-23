import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../../templates/Searchbar'
import { createUseGraph } from '../../hooks/useGraph'
import { usePagination } from '../../hooks/usePagination'
import { RouterManagerSessions } from '../../routers/RouterManagerSessions'

export type ListSessions = {}

export const ListSessions: FC<ListSessions> = () => {
  // load the sessions and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listSession = useListSession()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listSession.data && listSession.data.count,
  })
  const listSessionFetch = () => {
    listSession.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listSessionFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Sessions',
    description: 'See all the sessions who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Session',
      click: () => currentChange(''),
    },
    noscroll: [
      typeof current === 'string' &&
        create(RouterManagerSessions, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: listSessionFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listSession.data && listSession.data.sessions.length,
        total: listSession.data && listSession.data.count,
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
          listSession.data &&
          listSession.data.sessions.map(session =>
            create(List.Row, {
              key: session.id,
              click: () => currentChange(session.id),
              children: [
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

const useListSession = createUseGraph<{
  count: number
  sessions: Array<{
    id: string
    updated: string
  }>
}>({
  api: true,
  query: `
    query ListSessions($count: CountSessionsOptions, $list: ListSessionsOptions) {
      count: CountSessions(options: $count)
      sessions: ListSessions(options: $list) {
        id
        updated
      }
    }
  `,
})
