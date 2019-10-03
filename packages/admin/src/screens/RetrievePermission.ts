import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../hooks/useGraph'

export type IRetrievePermission = {
  id: string
  change?: () => void
}

export const RetrievePermission: FC<IRetrievePermission> = ({ id }) => {
  // load the permission to show on page
  const retrievePermissionGraph = useRetrievePermission({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview Permission',
    brand: 'Authenticator',
    children: create(Overview.Spacer, {
      children: retrievePermissionGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrievePermissionGraph.data.permission.id,
        }),
        create(Overview.Container, {
          key: 'Name',
          label: 'Name',
          icon: 'book',
          value: retrievePermissionGraph.data.permission.name,
        }),
        create(Overview.Container, {
          key: 'Tag',
          label: 'Tag',
          icon: 'tags',
          value: retrievePermissionGraph.data.permission.tag,
        }),
        create(Overview.Container, {
          key: 'Description',
          label: 'Description',
          icon: 'marker',
          value: retrievePermissionGraph.data.permission.description,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrievePermissionGraph.data.permission.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrievePermissionGraph.data.permission.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}

const useRetrievePermission = createUseGraph<{
  permission: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description: string
  }
}>({
  query: `
    query RetrievePermission($options: RetrievePermissionOptions!) {
      permission: RetrievePermission(options: $options) {
        id
        updated
        created
        name
        tag
        description
      }
    }
  `,
})
