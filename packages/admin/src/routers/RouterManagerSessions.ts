import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'

export type IRouterManagerSessions = {
  close?: () => void
}

export const RouterManagerSessions: FC<IRouterManagerSessions> = ({
  close,
}) => {
  return create(Modal.Container, {
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'history',
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
