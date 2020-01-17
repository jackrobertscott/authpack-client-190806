import { createElement as element, FC } from 'react'
import { useLocalRouter, Modal, IconBar } from '@authpack/theme'
import { WizardScripts } from './WizardScripts'
import { WizardOpen } from './WizardOpen'
import { WizardGuard } from './WizardGuard'
import { config } from '../config'

export const RouterWizard: FC<{
  visible?: boolean
  close: () => void
}> = ({ close, visible }) => {
  const router = useLocalRouter({
    nomatch: '/scripts',
    options: [
      {
        key: '/scripts',
        children: element(WizardScripts, {
          next: () => router.change('/open'),
        }),
      },
      {
        key: '/open',
        children: element(WizardOpen, {
          next: () => router.change('/guard'),
        }),
      },
      {
        key: '/guard',
        children: element(WizardGuard, {
          next: () => close(),
          more: () => window.open(config.documents),
        }),
      },
    ],
  })
  return element(Modal, {
    close,
    visible,
    children: element(IconBar, {
      children: router.current && router.current.children,
      icons: [
        {
          icon: 1,
          label: 'Scripts',
          focused: !!router.current && router.current.key === '/scripts',
          click: () => router.change('/scripts'),
        },
        {
          icon: 2,
          label: 'Show Modal',
          focused: !!router.current && router.current.key === '/open',
          click: () => router.change('/open'),
        },
        {
          icon: 3,
          label: 'Guard Pages',
          focused: !!router.current && router.current.key === '/guard',
          click: () => router.change('/guard'),
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
