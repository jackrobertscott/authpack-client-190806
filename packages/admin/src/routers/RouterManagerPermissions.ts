import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'

export type IRouterManagerPermissions = {
  close?: () => void
}

export const RouterManagerPermissions: FC<IRouterManagerPermissions> = ({
  close,
}) => {
  return create(Modal.Container, {
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'tags',
          label: 'Overview',
          children: null,
        },
        {
          icon: 'cog',
          label: 'Settings',
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
