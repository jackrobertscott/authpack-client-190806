import { createElement as create, FC } from 'react'
import { Modal } from 'wga-theme'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'

export type IRouterModalAuthed = {
  close?: () => void
}

export const RouterModalAuthed: FC<IRouterModalAuthed> = ({ close }) => {
  return create(Modal.Container, {
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'user-circle',
          label: 'User Settings',
          children: null,
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
