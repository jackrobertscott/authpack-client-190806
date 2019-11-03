import { createElement as create, FC } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterManagerApp: FC<{
  close: () => void
}> = ({ close }) => {
  const router = useLocalRouter({
    local: 'wga.ManagerApp',
    nomatch: '/payments',
    options: [{ key: '/payments', children: null }],
  })
  return create(Modal, {
    children: create(Layout, {
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: [
            {
              icon: 'bolt',
              label: 'Payments',
              click: () => router.change('/payments'),
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
