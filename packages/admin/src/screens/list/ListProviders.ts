import { createElement as create, FC, useEffect, useState } from 'react'
import { Page, List } from 'wga-theme'
import { format } from 'date-fns'
import { Searchbar } from '../../templates/Searchbar'
import { createUseGraph } from '../../hooks/useGraph'
import { usePagination } from '../../hooks/usePagination'
import { RouterManagerProviders } from '../../routers/RouterManagerProviders'

export type ListProviders = {}

export const ListProviders: FC<ListProviders> = () => {
  // load the providers and update results on search and pagination
  const [search, searchChange] = useState<string>('')
  const [current, currentChange] = useState<string | undefined>()
  const listProvider = useListProvider()
  const { limit, skip, next, previous, hasNext, hasPrevious } = usePagination({
    count: listProvider.data && listProvider.data.count,
  })
  const listProviderFetch = () => {
    listProvider.fetch({
      count: { search },
      list: { search, limit, skip },
    })
  }
  useEffect(() => {
    listProviderFetch()
    // eslint-disable-next-line
  }, [search, limit, skip])
  return create(Page.Container, {
    title: 'All Providers',
    description: 'See all the providers who have signed up to your app',
    button: {
      icon: 'plus',
      label: 'Create Provider',
      click: () => currentChange(''),
    },
    noscroll: [
      typeof current === 'string' &&
        create(RouterManagerProviders, {
          key: 'modal',
          id: current,
          close: () => currentChange(undefined),
          change: listProviderFetch,
        }),
      create(Searchbar, {
        key: 'searchbar',
        amount: listProvider.data && listProvider.data.providers.length,
        total: listProvider.data && listProvider.data.count,
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
          listProvider.data &&
          listProvider.data.providers.map(provider =>
            create(List.Row, {
              key: provider.id,
              click: () => currentChange(provider.id),
              children: [
                create(List.Cell, {
                  key: 'Name',
                  label: 'Name',
                  icon: 'provider',
                  value: provider.name,
                }),
                create(List.Cell, {
                  key: 'Tag',
                  label: 'Tag',
                  icon: 'tags',
                  value: provider.tag,
                }),
                create(List.Cell, {
                  key: 'Updated',
                  label: 'Updated',
                  icon: 'clock',
                  value: format(new Date(provider.updated), 'dd LLL yyyy'),
                }),
              ],
            })
          ),
      }),
    ],
  })
}

const useListProvider = createUseGraph<{
  count: number
  providers: Array<{
    id: string
    updated: string
    name: string
    tag: string
  }>
}>({
  api: true,
  query: `
    query ListProvider($count: CountProviderOptions, $list: ListProviderOptions) {
      count: CountProvider(options: $count)
      providers: ListProvider(options: $list) {
        id
        updated
        name
        tag
      }
    }
  `,
})
