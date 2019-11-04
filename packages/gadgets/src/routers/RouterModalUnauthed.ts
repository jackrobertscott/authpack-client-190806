import { createElement as create, FC } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterModalUnauthed: FC<{
  visible?: boolean
  close: () => void
}> = ({ close, visible }) => {
  const router = useLocalRouter({
    nomatch: '/login',
    options: [{ key: '/login', children: null }],
  })
  return create(Modal, {
    visible,
    children: create(Layout, {
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
    }),
  })
}
