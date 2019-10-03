import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { SwitchMode } from '../screens/SwitchMode'
import { RemoveSubscription } from '../screens/RemoveSubscription'
import { UpdateSubscription } from '../screens/UpdateSubscription'

export type IRouterPayment = {
  visible: boolean
  close?: () => void
}

export const RouterPayment: FC<IRouterPayment> = ({ visible, close }) => {
  return create(RouterModal, {
    close,
    visible,
    children: create(GadgetsIconbar, {
      close,
      screens: [
        {
          icon: 'cog',
          label: 'Switch Modes',
          children: create(SwitchMode),
        },
        {
          icon: 'wallet',
          label: 'Update',
          children: create(UpdateSubscription),
        },
        {
          icon: 'fire-alt',
          label: 'Danger Zone',
          children: create(RemoveSubscription),
        },
      ],
    }),
  })
}
