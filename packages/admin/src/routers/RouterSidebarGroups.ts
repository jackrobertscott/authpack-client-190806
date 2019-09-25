import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { ListGroups } from '../screens/list/ListGroups'
import { ListPermissions } from '../screens/list/ListPermissions'
import { ListMemberships } from '../screens/list/ListMemberships'

export type IRouterSidebarGroups = {}

export const RouterSidebarGroups: FC<IRouterSidebarGroups> = () => {
  return create(PageSidebar, {
    title: 'Groups',
    screens: [
      {
        icon: 'user-friends',
        label: 'See all groups',
        children: create(ListGroups),
        path: '/groups',
      },
      {
        icon: 'user-plus',
        label: 'See all memberships',
        children: create(ListMemberships),
        path: '/groups/memberships',
      },
      {
        icon: 'bookmark',
        label: 'See all permissions',
        children: create(ListPermissions),
        path: '/groups/permissions',
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
        path: '/groups/install',
      },
    ],
  })
}
