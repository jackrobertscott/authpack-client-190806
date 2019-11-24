import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  useSchema,
  Button,
  Control,
  Layout,
  InputString,
  InputSelectMany,
  Page,
  Snippet,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const CreateMembership: FC<{
  change?: (id?: string) => void
  close: () => void
}> = ({ change, close }) => {
  const settings = useSettings()
  const gqlCreateMembership = useCreateMembership()
  const gqlListPermissions = useListPermissions()
  const schema = useSchema({
    schema: SchemaCreateMembership,
    submit: input => {
      gqlCreateMembership.fetch({ input }).then(({ membership }) => {
        if (change) change(membership.id)
        close()
      })
    },
  })
  useEffect(() => {
    gqlListPermissions.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Page, {
    title: 'Add Member',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      create(Snippet, {
        key: 'snippet',
        icon: 'arrow-alt-circle-left',
        prefix: 'far',
        label: 'Cancel',
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
              create(Button, {
                key: 'submit',
                label: 'Add',
                loading: gqlCreateMembership.loading,
                disabled: !schema.valid,
                click: schema.submit,
              }),
            ],
      }),
    ],
  })
}

const SchemaCreateMembership = yup.object().shape({
  email: yup.string().email('Please use a valid email'),
  permission_ids: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useCreateMembership = createUseServer<{
  membership: {
    id: string
  }
}>({
  query: `
    mutation CreateMembershipClient($input: CreateMembershipInput!) {
      membership: CreateMembershipClient(input: $input) {
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
