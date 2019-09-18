import { createElement as create, FC } from 'react'
import { PageIconbar } from '../templates/PageIconbar'
import { RouterSidebarAccounts } from './RouterSidebarAccounts'
import { RouterSidebarGroups } from './RouterSidebarGroups'
import { RouterSidebarReports } from './RouterSidebarReports'
import { PageQueries } from '../pages/PageQueries'

export type IRouterCentral = {}

export const RouterCentral: FC<IRouterCentral> = () => {
  return create(PageIconbar, {
    screens: [
      {
        icon: 'users',
        label: 'Accounts',
        children: create(RouterSidebarAccounts),
        path: '/users',
      },
      {
        icon: 'project-diagram',
        label: 'Groups',
        children: create(RouterSidebarGroups),
        path: '/groups',
      },
      {
        icon: 'check-double',
        label: 'Reports',
        children: create(RouterSidebarReports),
        path: '/reports',
      },
      {
        icon: 'sitemap',
        label: 'Developers',
        children: create(PageQueries),
        path: '/developers',
      },
    ],
  })
}
