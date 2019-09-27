import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { createUseGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerGroups } from '../routers/RouterManagerGroups'

export type ListGroups = {}

export const ListGroups: FC<ListGroups> = () => {
  // load the groups and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listGroups = useListGroups()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listGroups.data && listGroups.data.count,
  })
  const listGroupsFetch = () => {
    listGroups.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listGroupsFetch()
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
          change: listGroupsFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listGroups.data && listGroups.data.groups.length,
        total: listGroups.data && listGroups.data.count,
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
          listGroups.data &&
          listGroups.data.groups.map(group =>
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
                  end: true,
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListGroups = createUseGraph<{
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
    query ListGroups($count: CountGroupsOptions, $list: ListGroupsOptions) {
      count: CountGroups(options: $count)
      groups: ListGroups(options: $list) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})
