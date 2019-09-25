import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { createUseGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerMemberships } from '../routers/RouterManagerMemberships'

export type ListMemberships = {}

export const ListMemberships: FC<ListMemberships> = () => {
  // load the memberships and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listMembership = useListMembership()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listMembership.data && listMembership.data.count,
  })
  const listMembershipFetch = () => {
    listMembership.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listMembershipFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Memberships',
    description: 'See all the memberships who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Membership',
      click: () => currentChange(''),
    },
    noscroll: [
      typeof current === 'string' &&
        create(RouterManagerMemberships, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: listMembershipFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listMembership.data && listMembership.data.memberships.length,
        total: listMembership.data && listMembership.data.count,
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
          listMembership.data &&
          listMembership.data.memberships.map(membership =>
            create(List.Row, {
              key: membership.id,
              click: () => currentChange(membership.id),
              children: [
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(membership.updated), 'dd LLL yyyy'),
                  end: true,
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListMembership = createUseGraph<{
  count: number
  memberships: Array<{
    id: string
    updated: string
  }>
}>({
  api: true,
  query: `
    query ListMemberships($count: CountMembershipsOptions, $list: ListMembershipsOptions) {
      count: CountMemberships(options: $count)
      memberships: ListMemberships(options: $list) {
        id
        updated
      }
    }
  `,
})
