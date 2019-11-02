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
  const listMemberships = useListMemberships()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listMemberships.data && listMemberships.data.count,
  })
  const listMembershipsFetch = () => {
    listMemberships.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listMembershipsFetch()
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
      create(RouterManagerMemberships, {
        key: 'modal',
        id: current,
        close: () => currentChange(undefined),
        change: listMembershipsFetch,
      }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listMemberships.data && listMemberships.data.memberships.length,
        total: listMemberships.data && listMemberships.data.count,
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
          listMemberships.data &&
          listMemberships.data.memberships.map(membership =>
            create(List.Row, {
              key: membership.id,
              click: () => currentChange(membership.id),
              children: [
                create(List.Cell, {
                  key: 'User',
                  label: 'User',
                  icon: 'user',
                  value: membership.user.name || membership.user.email,
                }),
                create(List.Cell, {
                  key: 'Workspace',
                  label: 'Workspace',
                  icon: 'project-diagram',
                  value: membership.workspace.name,
                }),
                create(List.Cell, {
                  key: 'Permissions',
                  label: 'Permissions',
                  icon: 'bookmark',
                  value: membership.permissions.map(({ tag }) => tag).join(','),
                }),
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

const useListMemberships = createUseGraph<{
  count: number
  memberships: Array<{
    id: string
    updated: string
    user: {
      email: string
      name?: string
    }
    workspace: {
      name: string
    }
    permissions: Array<{
      tag: string
    }>
  }>
}>({
  name: 'ListMemberships',
  query: `
    query ListMemberships($count: CountMembershipsOptions, $list: ListMembershipsOptions) {
      count: CountMemberships(options: $count)
      memberships: ListMemberships(options: $list) {
        id
        updated
        user {
          email
          name
        }
        workspace {
          name
        }
        permissions {
          tag
        }
      }
    }
  `,
})
