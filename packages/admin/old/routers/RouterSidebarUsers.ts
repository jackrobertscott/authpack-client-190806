import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { ListUsers } from '../screens/ListUsers'
import { ListSessions } from '../screens/ListSessions'
import { ListProviders } from '../screens/ListProviders'

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
        label: 'See all sessions',
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
