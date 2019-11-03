import { createElement as create, FC } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterManagerMembership: FC<{
  close: () => void
}> = ({ close }) => {
  const router = useLocalRouter({
    local: 'wga.ManagerMembership',
    nomatch: '/create',
    options: [{ key: '/create', children: null }],
  })
  return create(Modal, {
    children: create(Layout, {
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: [
            {
              icon: 'plus',
              label: 'Create',
              click: () => router.change('/create'),
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
        router.current && router.current.children,
      ],
    }),
  })
}
