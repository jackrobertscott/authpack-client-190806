import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateSubscription } from '../screens/CreateSubscription'
import { RemoveSubscription } from '../screens/RemoveSubscription'
import { UpdateSubscription } from '../screens/UpdateSubscription'
import { useGadgets } from '../hooks/useGadgets'

export type IRouterPayment = {
  visible: boolean
  close?: () => void
}

export const RouterPayment: FC<IRouterPayment> = ({ visible, close }) => {
  const gadgets = useGadgets()
  return create(RouterModal, {
    close,
    visible,
    children: create(GadgetsIconbar, {
      close,
      screens:
        gadgets.state &&
        gadgets.state.workspace &&
        gadgets.state.workspace.active
          ? [
              {
                icon: 'cog',
                label: 'Activate',
                children: create(CreateSubscription),
              },
            ]
          : [
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
