import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'

export type IRouterSidebarReports = {}

export const RouterSidebarReports: FC<IRouterSidebarReports> = ({}) => {
  return create(PageSidebar, {
    title: 'Reports',
    screens: [
      {
        icon: 'user',
        label: 'Account metrics',
        children: null,
      },
      {
        icon: 'users',
        label: 'Group metrics',
        children: null,
      },
    ],
  })
}
