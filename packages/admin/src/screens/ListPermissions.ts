import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { createUseGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerPermissions } from '../routers/RouterManagerPermissions'

export type ListPermissions = {}

export const ListPermissions: FC<ListPermissions> = () => {
  // load the permissions and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listPermissions = useListPermissions()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listPermissions.data && listPermissions.data.count,
  })
  const listPermissionsFetch = () => {
    listPermissions.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listPermissionsFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Permissions',
    description: 'See all the permissions who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Permission',
      click: () => currentChange(''),
    },
    noscroll: [
      create(RouterManagerPermissions, {
        key: 'modal',
        id: current,
        close: () => currentChange(undefined),
        change: listPermissionsFetch,
      }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listPermissions.data && listPermissions.data.permissions.length,
        total: listPermissions.data && listPermissions.data.count,
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
          listPermissions.data &&
          listPermissions.data.permissions.map(permission =>
            create(List.Row, {
              key: permission.id,
              click: () => currentChange(permission.id),
              children: [
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'book',
                  value: permission.name,
                }),
                create(List.Cell, {
                  key: 'Tag',
                  label: 'Tag',
                  icon: 'tags',
                  value: permission.tag,
                }),
                create(List.Cell, {
                  key: 'Description',
                  label: 'Description',
                  icon: 'pen-alt',
                  value: permission.description,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(permission.updated), 'dd LLL yyyy'),
                  end: true,
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListPermissions = createUseGraph<{
  count: number
  permissions: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description: string
  }>
}>({
  query: `
    query ListPermissions($count: CountPermissionsOptions, $list: ListPermissionsOptions) {
      count: CountPermissions(options: $count)
      permissions: ListPermissions(options: $list) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})
