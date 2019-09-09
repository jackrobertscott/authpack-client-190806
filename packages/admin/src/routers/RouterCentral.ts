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
        label: 'Accouts',
        children: create(RouterSidebarAccounts),
      },
      {
        icon: 'project-diagram',
        label: 'Groups',
        children: create(RouterSidebarGroups),
      },
      {
        icon: 'check-double',
        label: 'Reports',
        children: create(RouterSidebarReports),
      },
      {
        icon: 'sitemap',
        label: 'GraphQL Explorer',
        children: create(PageQueries),
      },
    ],
  })
}
