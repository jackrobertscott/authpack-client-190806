import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowUpgrade: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetUpgrade = useGetUpgrade()
  useEffect(() => {
    gqlGetUpgrade.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const upgrade = gqlGetUpgrade.data ? gqlGetUpgrade.data.upgrade : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Upgrade',
    children: !upgrade
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: upgrade.id,
            }),
            element(Snippet, {
              key: 'name',
              icon: 'users',
              label: 'Name',
              value: upgrade.name,
            }),
            element(Snippet, {
              key: 'tag',
              icon: 'tags',
              label: 'Tag',
              value: upgrade.tag,
            }),
            element(Snippet, {
              key: 'description',
              icon: 'book',
              label: 'Description',
              value: upgrade.description || '...',
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                upgrade.created &&
                format(new Date(upgrade.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                upgrade.updated &&
                format(new Date(upgrade.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetUpgrade = createUseServer<{
  upgrade: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query GetUpgrade($id: String!) {
      upgrade: GetUpgrade(id: $id) {
        id
        created
        updated
        name
        tag
        description
      }
    }
  `,
})
