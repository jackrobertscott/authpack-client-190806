import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { ListGroups } from '../screens/list/ListGroups'
import { ListPermissions } from '../screens/list/ListPermissions'

export type IRouterSidebarGroups = {}

export const RouterSidebarGroups: FC<IRouterSidebarGroups> = () => {
  return create(PageSidebar, {
    title: 'Groups',
    screens: [
      {
        icon: 'user-friends',
        label: 'See all groups',
        children: create(ListGroups),
      },
      {
        icon: 'bookmark',
        label: 'See all permissions',
        children: create(ListPermissions),
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
      },
    ],
  })
}
