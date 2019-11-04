import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'

export const ListMemberships: FC = () => {
  return create(Page, {
    title: 'Memberships',
    subtitle: '',
    children: null,
    noscroll: null,
  })
}
