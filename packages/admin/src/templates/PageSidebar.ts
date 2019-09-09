import { createElement as create, FC, ReactNode, useState } from 'react'
import { Layout, Sidebar } from 'wga-theme'

export type IPageSidebarScreen = {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export type IPageSidebar = {
  title: string
  screens: IPageSidebarScreen[]
}

export const PageSidebar: FC<IPageSidebar> = ({ title, screens }) => {
  const [active, changeActive] = useState<IPageSidebarScreen>(screens[0])
  return create(Layout.Container, {
    children: [
      create(Sidebar.Container, {
        key: 'iconbar',
        title,
        options: screens.map((screen, i) => ({
          key: screen.id || String(i),
          icon: screen.icon,
          label: screen.label,
          click: () => changeActive(screen),
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
