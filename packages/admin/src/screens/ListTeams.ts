import { createElement as create, FC } from 'react'
import { Page } from 'wga-theme'

export const ListTeams: FC = () => {
  return create(Page, {
    title: 'Teams',
    subtitle: '',
    children: null,
  })
}
