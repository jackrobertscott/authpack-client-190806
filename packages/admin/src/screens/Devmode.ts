import { createElement as create, FC } from 'react'
import { Focus, Button, InputBoolean, Layout } from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { GlobalStore } from '../utils/global'

export const Devmode: FC<{
  close: () => void
}> = ({ close }) => {
  const global = useGlobal()
  return create(Layout, {
    children: create(Focus, {
      icon: 'code',
      label: 'Dev Mode',
      helper: 'Maximum of 250 user accounts',
      children: create(Layout, {
        divide: true,
        center: true,
        children: [
          create(InputBoolean, {
            key: 'toggle',
            value: global.devmode,
            change: value => GlobalStore.update({ devmode: value }),
          }),
          create(Button, {
            icon: 'angle-right',
            label: 'Done',
            click: close,
          }),
        ],
      }),
    }),
  })
}
