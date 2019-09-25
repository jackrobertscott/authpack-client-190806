import { createElement as create, FC, ReactNode, useState } from 'react'
import { Layout, Sidebar } from 'wga-theme'

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
  const current =
    screens.find(screen => {
      return screen.path === document.location.pathname
    }) || screens[0]
  const [active, changeActive] = useState<IPageSidebarScreen>(current)
  const changeRouter = (screen: IPageSidebarScreen) => {
    changeActive(screen)
    window.history.pushState(null, screen.label, screen.path)
  }
  return create(Layout.Container, {
    children: [
      create(Sidebar.Container, {
        key: 'iconbar',
        title,
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
