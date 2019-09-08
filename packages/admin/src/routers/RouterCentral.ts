import { createElement as create, FC } from 'react'
import { PageIconbar } from '../templates/PageIconbar'
import { PageAccounts } from '../pages/PageAccounts'

export type IRouterCentral = {}

export const RouterCentral: FC<IRouterCentral> = () => {
  return create(PageIconbar, {
    screens: [
      {
        icon: 'users',
        label: 'Accouts',
        children: create(PageAccounts),
      },
      {
        icon: 'project-diagram',
        label: 'Groups',
        children: create(PageAccounts),
      },
      {
        icon: 'check-double',
        label: 'Reports',
        children: create(PageAccounts),
      },
    ],
  })
}
