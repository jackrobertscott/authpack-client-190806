import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../templates/Searchbar'
import { createUseGraph } from '../hooks/useGraph'
import { usePagination } from '../hooks/usePagination'
import { RouterManagerWorkspaces } from '../routers/RouterManagerWorkspaces'

export type ListWorkspaces = {}

export const ListWorkspaces: FC<ListWorkspaces> = () => {
  // load the workspaces and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listWorkspaces = useListWorkspaces()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listWorkspaces.data && listWorkspaces.data.count,
  })
  const listWorkspacesFetch = () => {
    listWorkspaces.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listWorkspacesFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Workspaces',
    description: 'See all the workspaces who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Workspace',
      click: () => currentChange(''),
    },
    noscroll: [
      create(RouterManagerWorkspaces, {
        key: 'modal',
        id: current,
        close: () => currentChange(undefined),
        change: listWorkspacesFetch,
      }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listWorkspaces.data && listWorkspaces.data.workspaces.length,
        total: listWorkspaces.data && listWorkspaces.data.count,
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
          listWorkspaces.data &&
          listWorkspaces.data.workspaces.map(workspace =>
            create(List.Row, {
              key: workspace.id,
              click: () => currentChange(workspace.id),
              children: [
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'project-diagram',
                  value: workspace.name,
                }),
                create(List.Cell, {
                  key: 'Tag',
                  label: 'Tag',
                  icon: 'tags',
                  value: workspace.tag,
                }),
                create(List.Cell, {
                  key: 'Description',
                  label: 'Description',
                  icon: 'pen-alt',
                  value: workspace.description,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(workspace.updated), 'dd LLL yyyy'),
                  end: true,
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListWorkspaces = createUseGraph<{
  count: number
  workspaces: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description: string
  }>
}>({
  name: 'ListWorkspaces',
  query: `
    query ListWorkspaces($count: CountWorkspacesOptions, $list: ListWorkspacesOptions) {
      count: CountWorkspaces(options: $count)
      workspaces: ListWorkspaces(options: $list) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})
