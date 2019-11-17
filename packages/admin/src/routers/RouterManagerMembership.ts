import { createElement as create, FC, Fragment } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterManagerMembership: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: id ? '/update' : '/create',
    options: id
      ? [{ key: '/update', children: null }]
      : [{ key: '/create', children: null }],
  })
  return create(Modal, {
    close,
    visible,
    children: create(Layout, {
      grow: true,
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: id
            ? [
                {
                  icon: 'plus',
                  label: 'Update',
                  focused: !!router.current && router.current.key === '/update',
                  click: () => router.change('/update'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  prefix: 'far',
                  seperated: true,
                },
              ]
            : [
                {
                  icon: 'plus',
                  label: 'Create',
                  focused: !!router.current && router.current.key === '/create',
                  click: () => router.change('/create'),
                },
                {
                  icon: 'times-circle',
                  label: 'Close',
                  click: close,
                  prefix: 'far',
                  seperated: true,
                },
              ],
        }),
        router.current &&
          create(Fragment, {
            key: 'children',
            children: router.current.children,
          }),
      ],
    }),
  })
}
