import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'

export type IRouterManagerGroups = {
  close?: () => void
}

export const RouterManagerGroups: FC<IRouterManagerGroups> = ({ close }) => {
  return create(Modal.Container, {
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'project-diagram',
          label: 'Overview',
          children: null,
        },
        {
          icon: 'cog',
          label: 'Settings',
          children: null,
        },
        {
          icon: 'users',
          label: 'Members of Group',
          children: null,
        },
        {
          icon: 'paper-plane',
          label: 'Add New Member',
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
