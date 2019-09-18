import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { PageUsers } from '../pages/PageUsers'
import { PageSessions } from '../pages/PageSessions'

export type IRouterSidebarUsers = {}

export const RouterSidebarUsers: FC<IRouterSidebarUsers> = () => {
  return create(PageSidebar, {
    title: 'Users',
    screens: [
      {
        icon: 'user',
        label: 'See all users',
        children: create(PageUsers),
      },
      {
        icon: 'history',
        label: 'See all sessions',
        children: create(PageSessions),
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
      },
    ],
  })
}
