import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'

export type IRouterSidebarReports = {}

export const RouterSidebarReports: FC<IRouterSidebarReports> = ({}) => {
  return create(PageSidebar, {
    title: 'Reports',
    screens: [
      {
        icon: 'user',
        label: 'See account metrics',
        children: null,
      },
      {
        icon: 'users',
        label: 'See group metrics',
        children: null,
      },
    ],
  })
}
