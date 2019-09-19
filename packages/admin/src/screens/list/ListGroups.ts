import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../../templates/Searchbar'
import { createUseGraph } from '../../hooks/useGraph'
import { usePagination } from '../../hooks/usePagination'
import { RouterManagerGroups } from '../../routers/RouterManagerGroups'

export type ListGroups = {}

export const ListGroups: FC<ListGroups> = () => {
  // load the groups and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listGroup = useListGroup()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listGroup.data && listGroup.data.count,
  })
  const listGroupFetch = () => {
    listGroup.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listGroupFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Groups',
    description: 'See all the groups who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Group',
      click: () => currentChange(''),
    },
    noscroll: [
      typeof current === 'string' &&
        create(RouterManagerGroups, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: listGroupFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listGroup.data && listGroup.data.groups.length,
        total: listGroup.data && listGroup.data.count,
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
          listGroup.data &&
          listGroup.data.groups.map(group =>
            create(List.Row, {
              key: group.id,
              click: () => currentChange(group.id),
              children: [
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'project-diagram',
                  value: group.name,
                }),
                create(List.Cell, {
                  key: 'Tag',
                  label: 'Tag',
                  icon: 'tags',
                  value: group.tag,
                }),
                create(List.Cell, {
                  key: 'Description',
                  label: 'Description',
                  icon: 'pen-alt',
                  value: group.description,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(group.updated), 'dd LLL yyyy'),
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListGroup = createUseGraph<{
  count: number
  groups: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description: string
  }>
}>({
  api: true,
  query: `
    query ListGroup($count: CountGroupOptions, $list: ListGroupOptions) {
      count: CountGroup(options: $count)
      groups: ListGroup(options: $list) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})
