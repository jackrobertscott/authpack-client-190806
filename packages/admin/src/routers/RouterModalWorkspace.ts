import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'

export type IRouterModalWorkspace = {
  close?: () => void
}

export const RouterModalWorkspace: FC<IRouterModalWorkspace> = ({ close }) => {
  return create(Modal.Container, {
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'toolbox',
          label: 'Overview',
          children: null,
        },
        {
          icon: 'cog',
          label: 'Settings',
          children: null,
        },
        {
          icon: 'handshake',
          label: '3rd Party Apps',
          children: null,
        },
        {
          icon: 'wallet',
          label: 'Billing',
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
