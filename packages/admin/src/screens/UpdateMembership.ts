import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Control,
  Layout,
  InputSelect,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetMembership = useGetMembership()
  const gqlUpdateMembership = useUpdateMembership()
  const gqlListRoles = useListRoles()
  const schema = useSchema({
    schema: SchemaUpdateMembership,
    submit: value => {
      gqlUpdateMembership.fetch({ id, value }).then(({ membership }) => {
        if (change) change(membership.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlListRoles.fetch()
    gqlGetMembership
      .fetch({ id })
      .then(({ membership }) => schema.set(membership))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Membership',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlListRoles.data
        ? null
        : [
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
              label: 'Save',
              loading: gqlGetMembership.loading || gqlUpdateMembership.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateMembership = yup.object().shape({
  role_id: yup.string(),
})

const useGetMembership = createUseServer<{
  membership: {
    role_id: string
  }
}>({
  query: `
    query GetMembership($id: String!) {
      membership: GetMembership(id: $id) {
        role_id
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

const useListRoles = createUseServer<{
  roles: Array<{
    id: string
    name: string
    description: string
  }>
}>({
  query: `
    query ListRolesClient {
      roles: ListRolesClient {
        id
        name
        description
      }
    }
  `,
})
