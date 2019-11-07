import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const CreateMembership: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Create Membership',
    subtitle: settings.appname,
    children: null,
  })
}

const useCreateMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  name: 'CreateMembership',
  query: `
    mutation CreateMembership($value: CreateMembershipValue!) {
      membership: CreateMembership(value: $value) {
        id
      }
    }
  `,
})

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
