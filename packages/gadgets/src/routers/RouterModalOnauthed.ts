import { createElement as create, FC } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterModalOnauthed: FC<{
  visible?: boolean
  close: () => void
}> = ({ close, visible }) => {
  const router = useLocalRouter({
    nomatch: '/update',
    options: [{ key: '/update', children: null }],
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
              label: 'Update',
              click: () => router.change('/update'),
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
