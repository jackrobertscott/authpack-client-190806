import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { PageAccounts } from '../pages/PageAccounts'
import { PageGroups } from '../pages/PageGroups'
import { PagePermissions } from '../pages/PagePermissions'

export type IRouterSidebarGroups = {}

export const RouterSidebarGroups: FC<IRouterSidebarGroups> = ({}) => {
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
