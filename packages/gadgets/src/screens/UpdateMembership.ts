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
  name: 'ListPermissions',
  query: `
    query ListPermissions {
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
  name: 'UpdateMembership',
  query: `
    mutation UpdateMembership($id: String!, $value: UpdateMembershipValue!) {
      membership: UpdateMembership(id: $id, value: $value) {
        id
      }
    }
  `,
})
