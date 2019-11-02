import { createElement as create, FC } from 'react'
import { PageIconbar } from '../templates/PageIconbar'
import { RouterSidebarUsers } from './RouterSidebarUsers'
import { RouterSidebarWorkspaces } from './RouterSidebarWorkspaces'
import { Queries } from '../screens/Queries'

export type IRouterCentral = {}

export const RouterCentral: FC<IRouterCentral> = () => {
  return create(PageIconbar, {
    screens: [
      {
        icon: 'users',
        path: '/users',
        label: 'Users',
        children: create(RouterSidebarUsers),
      },
      {
        icon: 'project-diagram',
        label: 'Workspaces',
        children: create(RouterSidebarWorkspaces),
        path: '/workspaces',
      },
      {
        icon: 'sitemap',
        label: 'Developers',
        children: create(Queries),
        path: '/developers',
      },
      // {
      //   icon: 'check-double',
      //   label: 'Reports',
      //   children: create(RouterSidebarReports),
      //   path: '/reports',
      // },
    ],
  })
}
