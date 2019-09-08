import { createElement as create, FC, ReactNode, useState } from 'react'
import { Iconbar, Layout } from 'wga-theme'
import { css } from 'emotion'

export interface IPageIconbarRouter {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export interface IPageIconbar {
  screens: IPageIconbarRouter[]
}

export const PageIconbar: FC<IPageIconbar> = ({ screens }) => {
  const options = screens.map((screen, i) => ({ id: String(i), ...screen }))
  const [active, changeActive] = useState<IPageIconbarRouter>(options[0])
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
            }),
          })
        }),
      }),
      active &&
        create('div', {
          children: create((() => active.children) as FC, {
            key: 'children',
          }),
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
