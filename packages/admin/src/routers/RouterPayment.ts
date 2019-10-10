import { createElement as create, FC } from 'react'
import { GadgetsIconbar } from '../templates/GadgetsIconbar'
import { RouterModal } from '../templates/RouterModal'
import { CreateSubscription } from '../screens/CreateSubscription'
import { RemoveSubscription } from '../screens/RemoveSubscription'
import { UpdateSubscription } from '../screens/UpdateSubscription'
import { UpdateOwner } from '../screens/UpdateOwner'
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
    children:
      state && state.workspace && state.workspace.id
        ? create(GadgetsIconbar, {
            close,
            screens: state.workspace.active
              ? [
                  {
                    icon: 'cog',
                    label: 'Settings',
                    children: create(UpdateOwner, {
                      id: state.workspace.id,
                    }),
                  },
                  {
                    icon: 'wallet',
                    label: 'Payment',
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
                    icon: 'bolt',
                    label: 'Activate',
                    children: create(CreateSubscription, {
                      change: closeAndUpdate,
                    }),
                  },
                  {
                    icon: 'cog',
                    label: 'Settings',
                    children: create(UpdateOwner, {
                      id: state.workspace.id,
                    }),
                  },
                ],
          })
        : null,
  })
}
