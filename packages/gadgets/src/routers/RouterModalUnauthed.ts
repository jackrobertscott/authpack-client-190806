import { createElement as create, FC } from 'react'
import { useLocalRouter, Layout, IconBar } from 'wga-theme'

export const RouterModalUnauthed: FC<{
  close: () => void
}> = ({ close }) => {
  const router = useLocalRouter({
    nomatch: '/login',
    options: [{ key: '/login', children: null }],
  })
  return create(Layout, {
    children: [
      create(IconBar, {
        key: 'iconBar',
        icons: [
          {
            icon: 'user',
            label: 'Login',
            click: () => router.change('/login'),
          },
          {
            icon: 'times-circle',
            label: 'Close',
            click: close,
            solid: false,
            seperated: true,
          },
        ],
      }),
      router.current &&
        create((() => router.current.children) as FC, {
          key: 'children',
        }),
    ],
  })
}
