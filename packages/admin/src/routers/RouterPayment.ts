import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateSubscription } from '../screens/CreateSubscription'
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
          label: 'Activate',
          children: create(CreateSubscription),
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
