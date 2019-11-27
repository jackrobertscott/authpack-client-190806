import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  useSchema,
  Control,
  Layout,
  InputSelectMany,
  Page,
  InputBoolean,
} from 'wga-theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlGetMembership = useGetMembership()
  const gqlUpdateMembership = useUpdateMembership()
  const gqlListPermissions = useListPermissions()
  const schema = useSchema({
    schema: SchemaUpdateMembership,
    poller: value => {
      gqlUpdateMembership
        .fetch({ id, value })
        .then(({ membership }) => change && change(membership.id))
    },
  })
  useEffect(() => {
    gqlListPermissions.fetch()
    gqlGetMembership
      .fetch({ id })
      .then(({ membership }) => schema.set(membership))
    // eslint-disable-next-line
  }, [id])
  return create(Page, {
    title: 'Update',
    subtitle: 'Membership',
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlListPermissions.data
        ? null
        : [
            create(Control, {
              key: 'admin',
              label: 'Admin',
              helper: 'Is this user an admin of the team',
              error: schema.error('admin'),
              children: create(InputBoolean, {
                value: schema.value('admin'),
                change: schema.change('admin'),
              }),
            }),
            !!gqlListPermissions.data.permissions.length &&
              create(Control, {
                key: 'permission_ids',
                label: 'Permissions',
                helper: 'Determine what the member can access',
                error: schema.error('permission_ids'),
                children: create(InputSelectMany, {
                  value: schema.value('permission_ids'),
                  change: schema.change('permission_ids'),
                  options: gqlListPermissions.data.permissions.map(
                    permission => {
                      return {
                        value: permission.id,
                        icon: 'user-sheild',
                        label: permission.name,
                        helper: permission.description,
                      }
                    }
                  ),
                }),
              }),
          ],
    }),
  })
}

const SchemaUpdateMembership = yup.object().shape({
  admin: yup.boolean(),
  permission_ids: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useGetMembership = createUseServer<{
  membership: {
    admin: boolean
    permission_ids: string
  }
}>({
  query: `
    query GetMembership($id: String!) {
      membership: GetMembership(id: $id) {
        admin
        permission_ids
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
    mutation UpdateMembership($id: String!, $value: UpdateMembershipValue!) {
      membership: UpdateMembership(id: $id, value: $value) {
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
    query ListPermissionsClient {
      permissions: ListPermissionsClient {
        id
        name
        description
      }
    }
  `,
})
