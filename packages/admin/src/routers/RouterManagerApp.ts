import { createElement as create, FC, useState, useEffect } from 'react'
import { useLocalRouter, Modal, Layout, IconBar } from 'wga-theme'

export const RouterManagerApp: FC<{
  id?: string
  close: () => void
}> = ({ close, ...options }) => {
  const [id, idChange] = useState<string | undefined>(options.id)
  useEffect(() => idChange(id), [id])
  const router = useLocalRouter({
    nomatch: id ? '/payments' : '/create',
    options: id
      ? [{ key: '/payments', children: null }]
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
