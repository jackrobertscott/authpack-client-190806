import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { ListWorkspaces } from '../screens/ListWorkspaces'
import { ListPermissions } from '../screens/ListPermissions'
import { ListMemberships } from '../screens/ListMemberships'

export type IRouterSidebarWorkspaces = {}

export const RouterSidebarWorkspaces: FC<IRouterSidebarWorkspaces> = () => {
  return create(PageSidebar, {
    title: 'Workspaces',
    screens: [
      {
        icon: 'user-friends',
        label: 'See all workspaces',
        children: create(ListWorkspaces),
        path: '/workspaces',
      },
      {
        icon: 'user-plus',
        label: 'See all memberships',
        children: create(ListMemberships),
        path: '/workspaces/memberships',
      },
      {
        icon: 'bookmark',
        label: 'See all permissions',
        children: create(ListPermissions),
        path: '/workspaces/permissions',
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
        path: '/workspaces/install',
      },
    ],
  })
}
