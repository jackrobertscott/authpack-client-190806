import { createElement as create, FC } from 'react'
import { PageIconbar } from '../templates/PageIconbar'
import { RouterSidebarAccounts } from './RouterSidebarAccounts'

export type IRouterCentral = {}

export const RouterCentral: FC<IRouterCentral> = () => {
  return create(PageIconbar, {
    screens: [
      {
        icon: 'users',
        label: 'Accouts',
        children: create(RouterSidebarAccounts),
      },
      {
        icon: 'project-diagram',
        label: 'Groups',
        children: create(RouterSidebarAccounts),
      },
      {
        icon: 'check-double',
        label: 'Reports',
        children: create(RouterSidebarAccounts),
      },
    ],
  })
}
