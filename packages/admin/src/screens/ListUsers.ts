import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'

export const ListUsers: FC = () => {
  return create(Page, {
    title: 'Users',
    subtitle: 'All accounts created on in your app',
    children: null,
  })
}
