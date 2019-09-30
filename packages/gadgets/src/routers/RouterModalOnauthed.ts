import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'

export type IRouterModalOnauthed = {
  close?: () => void
}

export const RouterModalOnauthed: FC<IRouterModalOnauthed> = ({ close }) => {
  return create(RouterModal, {
    close,
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'user-circle',
          label: 'User Settings',
          children: null,
          submenu: [
            {
              icon: 'bars',
              label: 'See all users',
              description: 'Search and navigate your apps users',
            },
            {
              icon: 'bars',
              label: 'See all users',
              description: 'Search and navigate your apps users',
            },
            {
              icon: 'bars',
              label: 'See all users',
              description: 'Search and navigate your apps users',
            },
          ],
        },
        {
          icon: 'users',
          label: 'Group Settings',
          children: null,
        },
        {
          icon: 'power-off',
          label: 'Logout',
          children: null,
        },
      ],
    }),
  })
}
