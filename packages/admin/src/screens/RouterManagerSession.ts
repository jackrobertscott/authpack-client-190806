import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { UpdateSession } from './UpdateSession'
import { RemoveSession } from './RemoveSession'
import { ShowSession } from './ShowSession'

export const RouterManagerSession: FC<{
  id?: string
  change?: (id?: string) => void
  visible?: boolean
  close: () => void
}> = ({ id, change, close, visible }) => {
  const router = useLocalRouter({
    nomatch: '/inspect',
    options: id
      ? [
          { key: '/inspect', children: element(ShowSession, { id }) },
          { key: '/update', children: element(UpdateSession, { id, change }) },
          { key: '/remove', children: element(RemoveSession, { id, change }) },
        ]
      : [],
  })
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      children: router.current && router.current.children,
      icons: [
        {
          icon: 'glasses',
          label: 'Inspect',
          focused: !!router.current && router.current.key === '/inspect',
          click: () => router.change('/inspect'),
        },
        {
          icon: 'sliders-h',
          label: 'Update',
          focused: !!router.current && router.current.key === '/update',
          click: () => router.change('/update'),
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
