import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Control,
  Layout,
  InputString,
  InputSelectMany,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const settings = useSettings()
  const gqlUpdateMembership = useUpdateMembership()
  const gqlListPermissions = useListPermissions()
  const schema = useSchema({
    schema: SchemaUpdateMembership,
    poller: value => {
      gqlUpdateMembership
        .fetch({ ...value, id })
        .then(({ membership }) => change && change(membership.id))
    },
  })
  useEffect(() => {
    gqlListPermissions.fetch()
  }, [])
  return create(Gadgets, {
    title: 'Update Member',
    subtitle: settings.app && settings.app.name,
    loading: gqlUpdateMembership.loading || gqlListPermissions.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'email',
          label: 'Email',
          error: schema.error('email'),
          children: create(InputString, {
            value: schema.value('email'),
            change: schema.change('email'),
            placeholder: 'example@email.com',
          }),
        }),
        !gqlListPermissions.data || !gqlListPermissions.data.permissions.length
          ? null
          : create(Control, {
              key: 'permission_ids',
              label: 'Permission Ids',
              error: schema.error('permission_ids'),
              children: create(InputSelectMany, {
                value: schema.value('permission_ids'),
                change: schema.change('permission_ids'),
                options: gqlListPermissions.data.permissions.map(permission => {
                  return {
                    value: permission.id,
                    icon: 'user-sheild',
                    label: permission.name,
                    helper: permission.description,
                  }
                }),
              }),
            }),
      ],
    }),
  })
}

const SchemaUpdateMembership = yup.object().shape({
  email: yup.string().email('Please use a valid email'),
  user_id: yup.string(),
  permission_ids: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useUpdateMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation wgaUpdateMembership($id: String!, $user_id: String, $email: String, $permission_ids: [String!]) {
      membership: wgaUpdateMembership(id: $id, user_id: $user_id, email: $email, permission_ids: $permission_ids) {
        id
      }
    }
  `,
})

const useListPermissions = createUseServer<{
  permissions: Array<{
    id: string
    name: string
    description: string
  }>
}>({
  query: `
    query wgaListPermissions {
      permissions: wgaListPermissions {
        id
        name
        description
      }
    }
  `,
})
