import { createElement as create, FC } from 'react'
import { Search } from 'wga-theme'

export type ISearchbar = {
  change: (value: string) => void
  previous?: () => void
  next?: () => void
}

export const Searchbar: FC<ISearchbar> = ({ change, previous, next }) => {
  return create(Search.Container, {
    children: [
      create(Search.Input, {
        key: 'search',
        icon: 'search',
        change,
        placeholder: 'Search...',
      }),
      create(Search.Group, {
        key: 'results',
        icon: 'stream',
        label: '25 of 1,543 Results',
      }),
      previous &&
        create(Search.Group, {
          key: 'previous',
          icon: 'angle-double-left',
          label: 'Previous',
          click: previous,
        }),
      next &&
        create(Search.Group, {
          key: 'next',
          icon: 'angle-double-right',
          label: 'Next',
          click: next,
        }),
    ],
  })
}
