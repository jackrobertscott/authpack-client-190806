import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type IUpdateSubscription = {}

export const UpdateSubscription: FC<IUpdateSubscription> = () => {
  return create(Gadgets.Container, {
    label: 'Update Subscription',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
