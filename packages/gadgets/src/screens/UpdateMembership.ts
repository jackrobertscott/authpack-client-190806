import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  useSchema,
  Control,
  Layout,
  InputSelectMany,
  Snippet,
  Page,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC<{
  id: string
  change?: (id?: string) => void
  close: () => void
}> = ({ id, change, close }) => {
  const settings = useSettings()
  const gqlGetMembership = useGetMembership()
  const gqlUpdateMembership = useUpdateMembership()
  const gqlListPermissions = useListPermissions()
  const schema = useSchema({
    schema: SchemaUpdateMembership,
    poller: input => {
      gqlUpdateMembership
        .fetch({ id, input })
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
    title: 'Update Member',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      create(Snippet, {
        key: 'snippet',
        icon: 'arrow-alt-circle-left',
        prefix: 'far',
        label: 'Back',
        click: close,
      }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: !gqlListPermissions.data
          ? null
          : [
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
    ],
  })
}

const SchemaUpdateMembership = yup.object().shape({
  permission_ids: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useGetMembership = createUseServer<{
  membership: {
    permission_ids: string
  }
}>({
  query: `
    query GetMembershipClient($id: String!) {
      membership: GetMembershipClient(id: $id) {
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
    mutation UpdateMembershipClient($id: String!, $input: UpdateMembershipInput!) {
      membership: UpdateMembershipClient(id: $id, input: $input) {
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
