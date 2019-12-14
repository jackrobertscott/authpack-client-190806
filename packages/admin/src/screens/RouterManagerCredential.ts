import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { RemoveCredential } from './RemoveCredential'
import { ShowCredential } from './ShowCredential'

export const RouterManagerCredential: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: '/inspect',
    options: id
      ? [
          { key: '/inspect', children: element(ShowCredential, { id }) },
          {
            key: '/remove',
            children: element(RemoveCredential, { id, change }),
          },
        ]
      : [],
  })
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      key: 'iconBar',
      children: router.current && router.current.children,
      icons: [
        {
          icon: 'glasses',
          label: 'Inspect',
          focused: !!router.current && router.current.key === '/inspect',
          click: () => router.change('/inspect'),
        },
        {
          icon: 'trash-alt',
          label: 'Remove',
          focused: !!router.current && router.current.key === '/remove',
          click: () => router.change('/remove'),
        },
        {
          icon: 'arrow-alt-circle-left',
          label: 'Back',
          click: close,
          prefix: 'far',
          seperated: true,
        },
      ],
    }),
  })
}
