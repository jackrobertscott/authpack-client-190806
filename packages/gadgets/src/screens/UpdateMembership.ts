import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Control,
  Layout,
  InputSelectMany,
  Snippet,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC<{
  id: string
  change?: (id?: string) => void
  close: () => void
}> = ({ id, change, close }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlGetMembership = useGetMembership()
  const gqlUpdateMembership = useUpdateMembership()
  const gqlListPermissions = useListPermissions()
  const schema = useSchema({
    schema: SchemaUpdateMembership,
    submit: input => {
      gqlUpdateMembership.fetch({ id, input }).then(({ membership }) => {
        if (change) change(membership.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlListPermissions.fetch()
    gqlGetMembership
      .fetch({ id })
      .then(({ membership }) => schema.set(membership))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update Member',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      element(Snippet, {
        key: 'snippet',
        icon: 'arrow-alt-circle-left',
        prefix: 'far',
        label: 'See Members',
        click: close,
      }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: !gqlListPermissions.data
          ? null
          : [
              !!gqlListPermissions.data.permissions.length &&
                element(Control, {
                  key: 'permission_ids',
                  label: 'Permissions',
                  helper: 'Determine what the member can access',
                  error: schema.error('permission_ids'),
                  children: element(InputSelectMany, {
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
              element(Button, {
                key: 'submit',
                label: 'Save',
                loading:
                  gqlGetMembership.loading || gqlUpdateMembership.loading,
                disabled: !schema.valid,
                click: schema.submit,
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
