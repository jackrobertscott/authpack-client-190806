import { createElement as create, FC, ReactNode, useState } from 'react'
import { Layout, Iconbar } from 'wga-theme'

export type IGadgetsIconbarScreen = {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export type IGadgetsIconbar = {
  close?: () => void
  screens: IGadgetsIconbarScreen[]
}

export const GadgetsIconbar: FC<IGadgetsIconbar> = ({ close, screens }) => {
  const [active, changeActive] = useState<IGadgetsIconbarScreen>(screens[0])
  return create(Layout.Container, {
    children: [
      create(Iconbar.Container, {
        key: 'iconbar',
        top: screens.map((screen, i) => {
          return create(Iconbar.Pointer, {
            key: screen.id || String(i),
            label: screen.label,
            children: create(Iconbar.Icon, {
              name: screen.icon,
              click: () => changeActive(screen),
              active: screen === active,
            }),
          })
        }),
        bottom:
          close &&
          create(Iconbar.Pointer, {
            label: 'Close',
            children: create(Iconbar.Icon, {
              name: 'times-circle',
              click: close,
            }),
          }),
      }),
      active &&
        create((() => active.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
