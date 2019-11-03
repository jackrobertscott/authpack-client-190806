import { createElement as create, FC } from 'react'
import { Layout, IconBar, useRouter } from 'wga-theme'
import { RouterSideBarHome } from './RouterSideBarHome'

export const RouterCentral: FC = () => {
  const router = useRouter(() => ({
    options: [{ path: '/home', children: RouterSideBarHome }],
  }))
  return create(Layout, {
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'home',
            label: 'Home',
          },
          {
            seperated: true,
            icon: 'bolt',
            label: 'Dev Mode',
          },
        ],
      }),
      router.current && router.current.children,
    ],
  })
}
