import { createElement as element, FC, useState, useEffect } from 'react'
import { SearchBar, usePaginator } from '@authpack/theme'

export const TemplateSearchBar: FC<{
  count?: number
  current?: number
  input?: boolean
  change: (search: string, limit: number, skip: number) => void
}> = ({ count, input = true, current, change }) => {
  const paginator = usePaginator({ count })
  const [search, searchChange] = useState<string>('')
  useEffect(() => {
    if (change) change(search, paginator.limit, paginator.skip)
    // eslint-disable-next-line
  }, [search, paginator.limit, paginator.skip])
  return element(SearchBar, {
    value: search,
    change: input ? searchChange : undefined,
    options: [
      {
        icon: 'stream',
        label: `Showing ${current || '...'} of ${paginator.total || '...'}`,
      },
      {
        icon: 'angle-double-left',
        label: 'Previous',
        click: paginator.previous,
        disabled: !paginator.hasPrevious(),
      },
      {
        icon: 'angle-double-right',
        label: 'Next',
        click: paginator.next,
        disabled: !paginator.hasNext(),
      },
    ],
  })
}
