import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  testAlphanumeric,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateUserCustomer: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const settings = useSettings()
  const gqlGetUser = useGetUser()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    submit: input => {
      gqlUpdateUser.fetch({ input }).then(({ user }) => {
        if (change) change(user.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetUser.fetch().then(({ user }) => schema.set(user))
    // eslint-disable-next-line
  }, [])
  return element(Page, {
    title: 'Update',
    subtitle: settings.cluster && settings.cluster.name,
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetUser.data
        ? null
        : [
            element(Button, {
              key: 'submit',
              label: 'Save',
              loading: gqlGetUser.loading || gqlUpdateUser.loading,
              disabled: !schema.valid,
              click: schema.submit,
            }),
          ],
    }),
  })
}

const SchemaUpdateUser = yup.object().shape({
  name_given: yup.string(),
  name_family: yup.string(),
  username: yup
    .string()
    .test(
      'alphamun',
      'Please use only numbers, letters and underscores',
      testAlphanumeric
    ),
})

const useGetUser = createUseServer<{
  user: {
    name_given: string
    name_family: string
    username: string
  }
}>({
  query: `
    query GetUserClient {
      user: GetUserClient {
        name_given
        name_family
        username
      }
    }
  `,
})

const useUpdateUser = createUseServer<{
  user: {
    id: string
  }
}>({
  query: `
    mutation UpdateUserClient($input: UpdateUserInput!) {
      user: UpdateUserClient(input: $input) {
        id
      }
    }
  `,
})
