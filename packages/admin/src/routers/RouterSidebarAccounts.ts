import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { PageAccounts } from '../pages/PageAccounts'
import { PageSessions } from '../pages/PageSessions'

export type IRouterSidebarAccounts = {}

export const RouterSidebarAccounts: FC<IRouterSidebarAccounts> = ({}) => {
  return create(PageSidebar, {
    title: 'Accounts',
    screens: [
      {
        icon: 'user',
        label: 'See all accounts',
        children: create(PageAccounts),
      },
      {
        icon: 'history',
        label: 'See all sessions',
        children: create(PageSessions),
      },
      {
        icon: 'cog',
        label: 'See install guide',
        children: create(PageAccounts),
      },
    ],
  })
}
