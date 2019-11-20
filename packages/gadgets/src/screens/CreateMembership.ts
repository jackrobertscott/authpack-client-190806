import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Control,
  Layout,
  InputString,
  InputSelectMany,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const CreateMembership: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlCreateMembership = useCreateMembership()
  const gqlListPermissions = useListPermissions()
  const schema = useSchema({
    schema: SchemaCreateMembership,
    submit: input => {
      gqlCreateMembership
        .fetch({ input })
        .then(({ membership }) => change && change(membership.id))
    },
  })
  useEffect(() => {
    gqlListPermissions.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Add Member',
    subtitle: settings.app && settings.app.name,
    loading: gqlCreateMembership.loading || gqlListPermissions.loading,
    children: create(Layout, {
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
            gqlListPermissions.data.permissions.length &&
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
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
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
    mutation wgaCreateMembership($input: CreateMembershipInput!) {
      membership: wgaCreateMembership(input: $input) {
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
