import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
  Page,
  Button,
  useToaster,
  InputBoolean,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetUser = useGetUser()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    submit: value => {
      gqlUpdateUser.fetch({ id, value }).then(({ user }) => {
        if (change) change(user.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetUser.fetch({ id }).then(({ user }) => schema.set(user))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'User',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetUser.data
        ? null
        : [
            element(Layout, {
              key: 'name',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'name_given',
                  label: 'First Name',
                  error: schema.error('name_given'),
                  children: element(InputString, {
                    value: schema.value('name_given'),
                    change: schema.change('name_given'),
                    placeholder: 'Fred',
                  }),
                }),
                element(Control, {
                  key: 'name_family',
                  label: 'Last Name',
                  error: schema.error('name_family'),
                  children: element(InputString, {
                    value: schema.value('name_family'),
                    change: schema.change('name_family'),
                    placeholder: 'Blogs',
                  }),
                }),
              ],
            }),
            element(Layout, {
              key: 'username',
              divide: true,
              media: true,
              children: [
                element(Control, {
                  key: 'username',
                  label: 'Username',
                  error: schema.error('username'),
                  children: element(InputString, {
                    value: schema.value('username'),
                    change: schema.change('username'),
                    placeholder: 'example_username_123',
                  }),
                }),
                element(Control, {
                  key: 'verified',
                  label: 'Verified',
                  error: schema.error('verified'),
                  children: element(InputBoolean, {
                    value: schema.value('verified'),
                    change: schema.change('verified'),
                  }),
                }),
              ],
            }),
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
  verified: yup.boolean(),
})

const useGetUser = createUseServer<{
  user: {
    name_given: string
    name_family: string
    username: string
    verified: boolean
  }
}>({
  query: `
    query GetUser($id: String!) {
      user: GetUser(id: $id) {
        name_given
        name_family
        username
        verified
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
    mutation UpdateUser($id: String!, $value: UpdateUserValue!) {
      user: UpdateUser(id: $id, value: $value) {
        id
      }
    }
  `,
})
