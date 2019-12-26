import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Page,
  Button,
  useToaster,
  Control,
  InputBoolean,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateMembership: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetMembership = useGetMembership()
  const gqlUpdateMembership = useUpdateMembership()
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
      children: [
        element(Control, {
          key: 'admin',
          label: 'Admin',
          helper: 'User will be have full control of team and members',
          error: schema.error('admin'),
          children: element(InputBoolean, {
            value: schema.value('admin'),
            change: schema.change('admin'),
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
  admin: yup.boolean(),
})

const useGetMembership = createUseServer<{
  membership: {
    admin: boolean
  }
}>({
  query: `
    query GetMembership($id: String!) {
      membership: GetMembership(id: $id) {
        admin
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
