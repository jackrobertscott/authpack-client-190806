import { createElement as create, FC } from 'react'
import { PageSidebar } from '../templates/PageSidebar'
import { PageAccounts } from '../pages/PageAccounts'

export type IRouterSidebarAccounts = {}

export const RouterSidebarAccounts: FC<IRouterSidebarAccounts> = ({}) => {
  return create(PageSidebar, {
    title: 'Accounts',
    screens: [
      {
        label: 'See all accounts',
        children: create(PageAccounts),
      },
      {
        label: 'See all sessions',
        children: create(PageAccounts),
      },
      {
        label: 'See install guide',
        children: create(PageAccounts),
      },
    ],
  })
}
