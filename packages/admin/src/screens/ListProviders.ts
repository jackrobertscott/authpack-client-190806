import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'

export const ListProviders: FC = () => {
  return create(Page, {
    title: 'Providers',
    subtitle: '',
    children: null,
    noscroll: null,
  })
}
