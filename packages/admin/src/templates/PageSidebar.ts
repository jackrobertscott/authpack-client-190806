import { createElement as create, FC, ReactNode, useState } from 'react'
import { Layout, Sidebar } from 'wga-theme'

export interface IPageSidebarScreen {
  id?: string
  icon: string
  label: string
  children: ReactNode
}

export interface IPageSidebar {
  title: string
  screens: IPageSidebarScreen[]
}

export const PageSidebar: FC<IPageSidebar> = ({ title, screens }) => {
  const options = screens.map((screen, i) => ({ id: String(i), ...screen }))
  const [active, changeActive] = useState<IPageSidebarScreen>(options[0])
  return create(Layout.Container, {
    children: [
      create(Sidebar.Container, {
        key: 'iconbar',
        title,
        options: screens.map(screen => ({
          icon: screen.icon,
          label: screen.label,
          click: () => changeActive(screen),
        })),
      }),
      active &&
        create((() => active.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
