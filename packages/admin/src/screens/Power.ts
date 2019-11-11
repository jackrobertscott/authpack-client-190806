import { createElement as create, FC } from 'react'
import { Focus, Button, InputBoolean, Layout } from 'wga-theme'

export const Power: FC<{
  close: () => void
}> = ({ close }) => {
  return create(Layout, {
    children: create(Focus, {
      icon: 'power-off',
      label: 'Power',
      helper: 'Turn your gadgets off',
      children: create(Layout, {
        divide: true,
        center: true,
        children: [
          create(InputBoolean, {
            key: 'toggle',
            value: false,
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
