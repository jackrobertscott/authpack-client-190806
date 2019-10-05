import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type IActivation = {}

export const Activation: FC<IActivation> = () => {
  return create(Gadgets.Container, {
    label: 'Activation',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
