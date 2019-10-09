import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateSubscription } from '../screens/CreateSubscription'
import { RemoveSubscription } from '../screens/RemoveSubscription'
import { UpdateSubscription } from '../screens/UpdateSubscription'
import { useGadgetsState } from '../hooks/useGadgets'
import { gadgets } from '../utils/wga'

export type IRouterPayment = {
  visible: boolean
  close?: () => void
}

export const RouterPayment: FC<IRouterPayment> = ({ visible, close }) => {
  const { state } = useGadgetsState()
  const closeAndUpdate = () => {
    if (close) close()
    gadgets.update()
  }
  return create(RouterModal, {
    close: closeAndUpdate,
    visible,
    children: create(GadgetsIconbar, {
      close,
      screens:
        state && state.workspace && state.workspace.active
          ? [
              {
                icon: 'wallet',
                label: 'Update',
                children: create(UpdateSubscription),
              },
              {
                icon: 'fire-alt',
                label: 'Danger Zone',
                children: create(RemoveSubscription, {
                  change: closeAndUpdate,
                }),
              },
            ]
          : [
              {
                icon: 'cog',
                label: 'Activate',
                children: create(CreateSubscription, {
                  change: closeAndUpdate,
                }),
              },
            ],
    }),
  })
}
