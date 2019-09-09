import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'

export type IRouterManagerAccounts = {
  close?: () => void
}

export const RouterManagerAccounts: FC<IRouterManagerAccounts> = ({
  close,
}) => {
  return create(Modal.Container, {
    children: create(GadgetsIconbar, {
      close,
      screens: [
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
      ],
    }),
  })
}
