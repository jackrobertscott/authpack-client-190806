import { createElement as create, FC } from 'react'
import { PageIconbar } from '../templates/PageIconbar'
import { RouterSidebarUsers } from './RouterSidebarUsers'
import { RouterSidebarGroups } from './RouterSidebarGroups'
import { RouterSidebarReports } from './RouterSidebarReports'
import { Queries } from '../screens/Queries'

export type IRouterCentral = {}

export const RouterCentral: FC<IRouterCentral> = () => {
  return create(PageIconbar, {
    screens: [
      {
        icon: 'users',
        label: 'Users',
        children: create(RouterSidebarUsers),
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
        children: create(Queries),
        path: '/developers',
      },
    ],
  })
}
