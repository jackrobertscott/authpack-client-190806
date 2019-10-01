import { createElement as create, FC, ReactNode, useState } from 'react'
import { Layout, Iconbar, IIconbarSubmenu } from 'wga-theme'

export type IGadgetsIconbarScreen = {
  id?: string
  icon: string
  label: string
  children?: ReactNode
  submenu?: { children?: ReactNode } & IIconbarSubmenu[]
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
            submenu: screen.submenu,
            children: create(Iconbar.Icon, {
              name: screen.icon,
              click: () => screen.children && changeActive(screen),
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
        create((() => active.children || null) as FC, {
          key: 'children',
        }),
    ],
  })
}
