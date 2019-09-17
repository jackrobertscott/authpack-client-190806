import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'

export type IRouterManagerAccounts = {
  id: string
  close?: () => void
}

export const RouterManagerAccounts: FC<IRouterManagerAccounts> = ({
  id,
  close,
}) => {
  return create(RouterModal, {
    close,
    children: create(GadgetsIconbar, {
      close,
      screens: id
        ? [
            {
              icon: 'address-book',
              label: 'Overview',
              children: null,
            },
            {
              icon: 'user-cog',
              label: 'Settings',
              children: null,
            },
            {
              icon: 'project-diagram',
              label: 'Groups of Account',
              children: null,
            },
            {
              icon: 'history',
              label: 'Sessions of Account',
              children: null,
            },
            {
              icon: 'unlock',
              label: 'Change Password',
              children: null,
            },
            {
              icon: 'handshake',
              label: '3rd Party Apps',
              children: null,
            },
            {
              icon: 'fire-alt',
              label: 'Danger Zone',
              children: null,
            },
          ]
        : [
            {
              icon: 'plus',
              label: 'Create Account',
              children: null,
            },
          ],
    }),
  })
}
