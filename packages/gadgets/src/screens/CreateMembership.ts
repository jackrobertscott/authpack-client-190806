import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Button,
  Control,
  Layout,
  InputString,
  Page,
  Snippet,
  InputSelect,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const CreateMembership: FC<{
  change?: (id?: string) => void
  close: () => void
}> = ({ change, close }) => {
  const settings = useSettings()
  const gqlCreateMembership = useCreateMembership()
  const gqlListRoles = useListRoles()
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
    gqlListRoles.fetch()
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Add Member',
    subtitle: settings.cluster && settings.cluster.name,
    children: [
      element(Snippet, {
        key: 'snippet',
        icon: 'arrow-alt-circle-left',
        prefix: 'far',
        label: 'Cancel',
        click: close,
      }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: !gqlListRoles.data
          ? null
          : [
              element(Control, {
                key: 'email',
                label: 'Email',
                error: schema.error('email'),
                children: element(InputString, {
                  value: schema.value('email'),
                  change: schema.change('email'),
                  placeholder: 'example@email.com',
                }),
              }),
              !!gqlListRoles.data.roles.length &&
                element(Control, {
                  key: 'role_id',
                  label: 'Roles',
                  helper: 'Determine what the member can access',
                  error: schema.error('role_id'),
                  children: element(InputSelect, {
                    value: schema.value('role_id'),
                    change: schema.change('role_id'),
                    options: gqlListRoles.data.roles.map(role => {
                      return {
                        value: role.id,
                        icon: 'user-sheild',
                        label: role.name,
                        helper: role.description,
                      }
                    }),
                  }),
                }),
              element(Button, {
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
  role_id: yup.string(),
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

const useListRoles = createUseServer<{
  roles: Array<{
    id: string
    name: string
    description: string
  }>
}>({
  query: `
    query ListRolesClient {
      role: ListRolesClient {
        id
        name
        description
      }
    }
  `,
})
