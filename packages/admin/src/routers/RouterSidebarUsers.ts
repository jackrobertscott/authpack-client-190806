import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { ListUsers } from '../screens/list/ListUsers'
import { ListSessions } from '../screens/list/ListSessions'
import { ListProviders } from '../screens/list/ListProviders'

export type IRouterSidebarUsers = {}

export const RouterSidebarUsers: FC<IRouterSidebarUsers> = () => {
  return create(PageSidebar, {
    title: 'Users',
    screens: [
      {
        icon: 'user',
        label: 'See all users',
        children: create(ListUsers),
        path: '/users',
      },
      {
        icon: 'history',
        label: 'See all user sessions',
        children: create(ListSessions),
        path: '/users/sessions',
      },
      {
        icon: 'share-alt',
        label: 'See all providers',
        children: create(ListProviders),
        path: '/users/providers',
      },
      {
        icon: 'code',
        label: 'See install guide',
        children: null,
        path: '/users/install',
      },
    ],
  })
}
