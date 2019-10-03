import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type IRemoveSubscription = {}

export const RemoveSubscription: FC<IRemoveSubscription> = () => {
  return create(Gadgets.Container, {
    label: 'Remove Subscription',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
