import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../../templates/Searchbar'
import { createUseGraph } from '../../hooks/useGraph'
import { usePagination } from '../../hooks/usePagination'
import { RouterManagerPermissions } from '../../routers/RouterManagerPermissions'

export type ListPermissions = {}

export const ListPermissions: FC<ListPermissions> = () => {
  // load the permissions and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listPermission = useListPermission()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listPermission.data && listPermission.data.count,
  })
  const listPermissionFetch = () => {
    listPermission.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listPermissionFetch()
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
      typeof current === 'string' &&
        create(RouterManagerPermissions, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: listPermissionFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listPermission.data && listPermission.data.permissions.length,
        total: listPermission.data && listPermission.data.count,
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
          listPermission.data &&
          listPermission.data.permissions.map(permission =>
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

const useListPermission = createUseGraph<{
  count: number
  permissions: Array<{
    id: string
    updated: string
    name: string
    tag: string
  }>
}>({
  api: true,
  query: `
    query ListPermissions($count: CountPermissionsOptions, $list: ListPermissionsOptions) {
      count: CountPermissions(options: $count)
      permissions: ListPermissions(options: $list) {
        id
        updated
        name
        tag
      }
    }
  `,
})
