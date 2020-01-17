import { createElement as element, FC, useEffect } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { SwitchClusterClient } from './SwitchClusterClient'
import { CreateClusterClient } from './CreateClusterClient'

export const RouterManagerClusterClient: FC<{
  visible?: boolean
  close: () => void
  goto?: string
}> = ({ close, visible, goto }) => {
  const router = useLocalRouter({
    nomatch: '/switch',
    options: [
      {
        key: '/switch',
        children: element(SwitchClusterClient, {
          add: () => router.change('/create'),
        }),
      },
      {
        key: '/create',
        children: element(CreateClusterClient, {
          change: () => router.change('/inspect'),
        }),
      },
    ],
  })
  useEffect(() => {
    if (goto) router.change(goto)
    // eslint-disable-next-line
  }, [goto])
  const navigate = (go: string) => router.change(go)
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      children: router.current && router.current.children,
      icons: [
        {
          icon: 'random',
          label: 'Switch',
          focused: !!router.current && router.current.key === '/switch',
          click: () => navigate('/switch'),
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
  })
}
