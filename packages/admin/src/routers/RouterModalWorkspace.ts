import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'

export type IRouterModalWorkspace = {
  close?: () => void
}

export const RouterModalWorkspace: FC<IRouterModalWorkspace> = ({ close }) => {
  return create(RouterModal, {
    close,
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
