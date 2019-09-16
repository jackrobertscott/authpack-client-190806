import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'

export type IRouterManagerMemberships = {
  close?: () => void
}

export const RouterManagerMemberships: FC<IRouterManagerMemberships> = ({
  close,
}) => {
  return create(RouterModal, {
    close,
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'user-tag',
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
