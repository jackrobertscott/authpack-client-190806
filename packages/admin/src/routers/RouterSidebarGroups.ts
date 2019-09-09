import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { PageAccounts } from '../pages/PageAccounts'

export type IRouterSidebarGroups = {}

export const RouterSidebarGroups: FC<IRouterSidebarGroups> = ({}) => {
  return create(PageSidebar, {
    title: 'Groups',
    screens: [
      {
        icon: 'user-friends',
        label: 'See all groups',
        children: null,
      },
      {
        icon: 'bookmark',
        label: 'See all permissions',
        children: null,
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
      },
    ],
  })
}
