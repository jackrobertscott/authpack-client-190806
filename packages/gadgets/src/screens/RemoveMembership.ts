import { createElement as create, FC, useState } from 'react'
import { createUseServer } from '../hooks/useServer'
import { Button, Layout, Focus, Poster, Page } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const RemoveMembership: FC<{
  id: string
  change?: (id?: string) => void
  close: () => void
}> = ({ id, change, close }) => {
  const settings = useSettings()
  const gqlRemoveMembership = useRemoveMembership()
  const [confirm, confirmChange] = useState<boolean>(false)
  return create(Page, {
    title: 'Remove Member',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      create(Poster, {
        key: 'poster',
        icon: 'trash-alt',
        label: 'Remove',
        helper: 'Remove this team member',
      }),
      create(Layout, {
        key: 'layout',
        padding: true,
        divide: true,
        media: true,
        children: [
          create(Button, {
            key: 'remove',
            label: 'Remove',
            click: () => confirmChange(true),
          }),
          create(Button, {
            key: 'cancel',
            icon: 'arrow-alt-circle-left',
            prefix: 'far',
            label: 'Remove',
            click: close,
            minor: true,
          }),
        ],
      }),
      create(Focus, {
        key: 'focus',
        icon: 'exclamation-triangle',
        label: 'Are you sure?',
        helper: 'Please confirm the removal of this team member',
        visible: confirm,
        children: create(Layout, {
          divide: true,
          media: true,
          children: [
            create(Button, {
              key: 'confirm',
              icon: 'check',
              label: 'Confirm',
              loading: gqlRemoveMembership.loading,
              click: () =>
                gqlRemoveMembership
                  .fetch({ id })
                  .then(() => change && change()),
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

const useRemoveMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation RemoveMembershipClient($id: String!) {
      membership: RemoveMembershipClient(id: $id) {
        id
      }
    }
  `,
})
