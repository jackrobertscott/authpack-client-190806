import { createElement as create, FC, ReactNode, useState } from 'react'
import { Iconbar, Layout } from 'wga-theme'
import { css } from 'emotion'

export type IPageIconbarRouter = {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export type IPageIconbar = {
  screens: IPageIconbarRouter[]
}

export const PageIconbar: FC<IPageIconbar> = ({ screens }) => {
  const [active, changeActive] = useState<IPageIconbarRouter>(screens[0])
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
