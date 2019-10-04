import { createElement as create, FC, ReactNode, useState } from 'react'
import { Iconbar, Layout, IIconbarSubmenu } from 'wga-theme'
import { css } from 'emotion'
import { gadgets } from '../utils/wga'
import { RouterPayment } from '../routers/RouterPayment'

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
}

export const PageIconbar: FC<IPageIconbar> = ({ screens }) => {
  const preload =
    screens.find(screen => {
      return document.location.pathname.startsWith(screen.path)
    }) || screens[0]
  const [active, changeActive] = useState<{ children?: ReactNode }>(preload)
  const changeRouter = (screen: IPageIconbarScreen) => {
    changeActive(screen)
    window.history.pushState(null, screen.label, screen.path)
  }
  // prepare the devmode modal
  const [devmode, changeDevmode] = useState<boolean>(false)
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
              click: () => changeDevmode(true),
            }),
          }),
          create(Iconbar.Pointer, {
            key: 'workspace',
            icon: 'user-circle',
            label: 'Account',
            children: create(Iconbar.Icon, {
              name: 'user-circle',
              click: () => gadgets.open(),
            }),
          }),
        ],
      }),
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
      create(RouterPayment, {
        key: 'devmode',
        close: () => changeDevmode(false),
        visible: devmode,
      }),
    ],
  })
}
