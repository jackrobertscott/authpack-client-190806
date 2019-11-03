import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'

export const ListSessions: FC = () => {
  return create(Page, {
    title: 'Sessions',
    subtitle: '',
    children: null,
  })
}
