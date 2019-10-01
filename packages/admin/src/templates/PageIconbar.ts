import { createElement as create, FC, ReactNode, useState } from 'react'
import { Iconbar, Layout, IIconbarSubmenu } from 'wga-theme'
import { css } from 'emotion'

export type IPageIconbarScreen = {
  id?: string
  icon: string
  label: string
  submenu?: IIconbarSubmenu[]
  children: ReactNode
  path: string
}

export type IPageIconbar = {
  screens: IPageIconbarScreen[]
  logout?: () => void
  group?: () => void
  devmode?: () => void
}

export const PageIconbar: FC<IPageIconbar> = ({
  screens,
  logout,
  group,
  devmode,
}) => {
  const preload = screens.find(screen => {
    return document.location.pathname.startsWith(screen.path)
  })
  const [active, changeActive] = useState<IPageIconbarScreen>(
    preload || screens[0]
  )
  const changeRouter = (screen: IPageIconbarScreen) => {
    changeActive(screen)
    window.history.pushState(null, screen.label, screen.path)
  }
  return create(Layout.Container, {
    children: [
      create(Iconbar.Container, {
        key: 'iconbar',
        top: screens.map((screen, i) => {
          return create(Iconbar.Pointer, {
            key: screen.id || String(i),
            icon: screen.icon,
            label: screen.label,
            submenu: screen.submenu,
            children: create(Iconbar.Icon, {
              name: screen.icon,
              click: () => changeRouter(screen),
              active: screen === active,
            }),
          })
        }),
        bottom: [
          create(Iconbar.Pointer, {
            key: 'devmode',
            icon: 'code',
            label: 'Dev Mode',
            children: create(Iconbar.Icon, {
              name: 'code',
              click: devmode,
            }),
          }),
          create(Iconbar.Pointer, {
            key: 'group',
            icon: 'bars',
            label: 'Group',
            children: create(Iconbar.Icon, {
              name: 'bars',
              click: group,
            }),
          }),
          create(Iconbar.Pointer, {
            key: 'logout',
            icon: 'power-off',
            label: 'Logout',
            children: create(Iconbar.Icon, {
              name: 'power-off',
              click: logout,
            }),
          }),
        ],
      }),
      active &&
        create('div', {
          key: 'children',
          children: active.children,
          className: css({
            all: 'unset',
            display: 'flex',
            position: 'relative',
            flexGrow: 1,
          }),
        }),
    ],
  })
}
