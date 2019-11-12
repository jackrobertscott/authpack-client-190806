import { createElement as create, FC, useState } from 'react'
import { Gadgets, Button, Layout, Poster, Focus } from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const RemoveUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const global = useGlobal()
  const gqlRemoveUser = useRemoveUser()
  const [confirm, confirmChange] = useState<boolean>(false)
  return create(Gadgets, {
    title: 'Update User',
    subtitle: global.appname,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'fire-alt',
        label: 'Remove',
        helper: 'Permanently remove this user',
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
        helper: 'Please confirm the removal of this user',
        visible: confirm,
        children: create(Layout, {
          divide: true,
          children: [
            create(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              click: () =>
                gqlRemoveUser.fetch({ id }).then(() => change && change()),
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

const useRemoveUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation apiRemoveUser($id: String!) {
      user: apiRemoveUser(id: $id) {
        id
      }
    }
  `,
})
