import { createElement as create, FC, ReactNode, useState } from 'react'
import { Layout, Sidebar } from 'wga-theme'
import { gadgets } from '../utils/wga'

export type IPageSidebarScreen = {
  id?: string
  icon: string
  label: string
  children: ReactNode
  path: string
}

export type IPageSidebar = {
  title: string
  screens: IPageSidebarScreen[]
}

export const PageSidebar: FC<IPageSidebar> = ({ title, screens }) => {
  const preload =
    screens.find(screen => {
      return document.location.pathname === screen.path
    }) || screens[0]
  const [active, changeActive] = useState<{
    children?: ReactNode
  }>(preload)
  const changeRouter = (screen: IPageSidebarScreen) => {
    changeActive(screen)
    window.history.pushState(null, screen.label, screen.path)
  }
  return create(Layout.Container, {
    children: [
      create(Sidebar.Container, {
        key: 'iconbar',
        title,
        bottom: gadgets.state
          ? `${gadgets.state.user.name}\n${gadgets.state.user.email}`
          : '',
        options: screens.map((screen, i) => ({
          key: screen.id || String(i),
          icon: screen.icon,
          label: screen.label,
          click: () => changeRouter(screen),
          active: screen === active,
        })),
      }),
      active &&
        create((() => active.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
