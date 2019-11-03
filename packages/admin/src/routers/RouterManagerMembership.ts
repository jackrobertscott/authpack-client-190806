import { createElement as create, FC, useState, useEffect } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterManagerMembership: FC<{
  id?: string
  close: () => void
}> = ({ close, ...options }) => {
  const [id, idChange] = useState<string | undefined>(options.id)
  useEffect(() => idChange(id), [id])
  const router = useLocalRouter({
    nomatch: id ? '/update' : '/create',
    options: id
      ? [{ key: '/update', children: null }]
      : [{ key: '/create', children: null }],
  })
  return create(Modal, {
    children: create(Layout, {
      children: [
        create(IconBar, {
          key: 'iconBar',
          icons: id
            ? [
                {
                  icon: 'plus',
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
              ]
            : [
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
