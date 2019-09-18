import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { PageGroups } from '../screens/list/ListGroups'
import { PagePermissions } from '../screens/list/ListPermissions'

export type IRouterSidebarGroups = {}

export const RouterSidebarGroups: FC<IRouterSidebarGroups> = () => {
  return create(PageSidebar, {
    title: 'Groups',
    screens: [
      {
        icon: 'user-friends',
        label: 'See all groups',
        children: create(PageGroups),
      },
      {
        icon: 'bookmark',
        label: 'See all permissions',
        children: create(PagePermissions),
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
      },
    ],
  })
}
