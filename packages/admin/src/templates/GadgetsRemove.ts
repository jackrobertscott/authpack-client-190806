import { createElement as create, FC, useState, Fragment } from 'react'
import { Poster, Layout, Button, Focus } from 'wga-theme'

export const ConfirmRemove: FC<{
  helper: string
  alert: string
  change: () => void
}> = ({ helper, alert, change }) => {
  const [confirm, confirmChange] = useState<boolean>(false)
  return create(Fragment, {
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'fire-alt',
        label: 'Remove',
        helper,
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: create(Button, {
          label: 'Remove',
          click: () => confirmChange(true),
        }),
      }),
      create(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: alert,
        visible: confirm,
        children: create(Layout, {
          divide: true,
          children: [
            create(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              click: change,
            }),
            create(Button, {
              key: 'cancel',
              minor: true,
              icon: 'times',
              label: 'Cancel',
              click: () => confirmChange(false),
            }),
          ],
        }),
      }),
    ],
  })
}
