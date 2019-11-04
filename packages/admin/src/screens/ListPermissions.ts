import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'

export const ListPermissions: FC = () => {
  return create(Page, {
    title: 'Permissions',
    subtitle: '',
    children: null,
    noscroll: null,
  })
}
