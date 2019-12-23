import * as yup from 'yup'
import { createElement as element, FC } from 'react'
import {
  useSchema,
  Button,
  Control,
  Layout,
  InputString,
  Page,
  Snippet,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const CreateMembership: FC<{
  change?: (id?: string) => void
  close: () => void
}> = ({ change, close }) => {
  const settings = useSettings()
  const gqlCreateMembership = useCreateMembership()
  const schema = useSchema({
    schema: SchemaCreateMembership,
    submit: input => {
      gqlCreateMembership.fetch({ input }).then(({ membership }) => {
        if (change) change(membership.id)
        close()
      })
    },
  })
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
        children: [
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
