import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'

export type ISwitchMode = {}

export const SwitchMode: FC<ISwitchMode> = () => {
  return create(Gadgets.Container, {
    label: 'Switch Mode',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: null,
    }),
  })
}
