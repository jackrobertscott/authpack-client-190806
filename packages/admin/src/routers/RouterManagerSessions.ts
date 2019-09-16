import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'

export type IRouterManagerSessions = {
  close?: () => void
}

export const RouterManagerSessions: FC<IRouterManagerSessions> = ({
  close,
}) => {
  return create(RouterModal, {
    close,
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
