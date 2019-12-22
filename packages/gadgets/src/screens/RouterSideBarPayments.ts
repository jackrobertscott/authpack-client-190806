import { createElement as element, FC } from 'react'
import { useLocalRouter, SideBar } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { UpdateUserCustomer } from './UpdateUserCustomer'
import { RemoveUserSubscription } from './RemoveUserSubscription'

export const RouterSideBarPayments: FC = () => {
  const settings = useSettings()
  const router = useLocalRouter({
    name: 'payments',
    nomatch: '/payments/update',
    options: [
      { key: '/payments/update', children: element(UpdateUserCustomer) },
      {
        key: '/payments/danger',
        children: element(RemoveUserSubscription),
        nosave: true,
      },
    ],
  })
  if (!settings.bearer) return null
  return element(SideBar, {
    key: 'sideBar',
    title: 'Subscription',
    footer: settings.user && settings.user.name,
    children: router.current && router.current.children,
    options: [
      {
        icon: 'user-cog',
        label: 'Update',
        focused: router.current && router.current.key === '/payments/update',
        click: () => router.change('/payments/update'),
      },
      {
        icon: 'trash-alt',
        label: 'Remove',
        focused: router.current && router.current.key === '/payments/danger',
        click: () => router.change('/payments/danger'),
      },
    ],
  })
}
