import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Members',
    subtitle: settings.appname,
    children: null,
  })
}

const useListPermissions = createUseServer<{
  permissions: Array<{
    id: string
  }>
}>({
  query: `
    query wgaListPermissions {
      permissions: ListPermissions {
        id
      }
    }
  `,
})

const useUpdateMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation wgaUpdateMembership($id: String!, $permission_ids: [String!]) {
      membership: wgaUpdateMembership(id: $id, permission_ids: $permission_ids) {
        id
      }
    }
  `,
})
