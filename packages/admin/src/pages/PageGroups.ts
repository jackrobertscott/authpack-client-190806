import { createElement as create, FC } from 'react'
import { Page, List } from 'wga-theme'
import { Searchbar } from '../templates/Searchbar'

export type IPageGroups = {}

export const PageGroups: FC<IPageGroups> = () => {
  const items = ['bell', 'bolt', 'carrot', 'cat']
  return create(Page.Container, {
    title: 'All Groups',
    description: 'See all the groups created in your app',
    scroll: [
      create(Searchbar, {
        key: 'searchbar',
        change: console.log,
        previous: () => console.log('previous'),
        next: () => console.log('next'),
      }),
      create(List.Container, {
        key: 'list',
        children: items.map(row =>
          create(List.Row, {
            key: row,
            click: () => console.log(row),
            children: items.map(icon =>
              create(List.Cell, {
                key: icon,
                icon,
                label: 'Hello',
                value: '12345',
              })
            ),
          })
        ),
      }),
    ],
  })
}
