import { createElement as create, FC, useState, useEffect } from 'react'
import { SearchBar, usePaginator } from 'wga-theme'

export const TemplateSearchBar: FC<{
  count?: number
  change: (search: string, limit: number, skip: number) => void
}> = ({ count, change }) => {
  const paginator = usePaginator({ count })
  const [search, searchChange] = useState<string>('')
  useEffect(() => {
    change(search, paginator.limit, paginator.skip)
    // eslint-disable-next-line
  }, [search, paginator.limit, paginator.skip])
  return create(SearchBar, {
    value: search,
    change: searchChange,
    options: [
      {
        icon: 'angle-double-left',
        label: 'Previous',
        click: paginator.previous,
        disabled: !paginator.hasPrevious,
      },
      {
        icon: 'angle-double-right',
        label: 'Next',
        click: paginator.next,
        disabled: !paginator.hasNext,
      },
    ],
  })
}
