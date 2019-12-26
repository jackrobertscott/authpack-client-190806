import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Control,
  Layout,
  Snippet,
  Page,
  Button,
  useToaster,
  InputBoolean,
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
        children: [
          settings.membership &&
            settings.membership.admin &&
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
    ],
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
    query GetMembershipClient($id: String!) {
      membership: GetMembershipClient(id: $id) {
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
    mutation UpdateMembershipClient($id: String!, $input: UpdateMembershipInput!) {
      membership: UpdateMembershipClient(id: $id, input: $input) {
        id
      }
    }
  `,
})
