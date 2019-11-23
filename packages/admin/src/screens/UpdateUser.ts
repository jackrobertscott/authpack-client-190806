import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  testAlphanumeric,
} from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdateUser: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
  const gqlGetUser = useGetUser()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    poller: value => {
      gqlUpdateUser
        .fetch({ id, value })
        .then(({ user }) => change && change(user.id))
    },
  })
  useEffect(() => {
    gqlGetUser.fetch({ id }).then(({ user }) => schema.set(user))
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update User',
    subtitle: universal.cluster_name,
    loading: gqlUpdateUser.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetUser.data
        ? null
        : [
            create(Layout, {
              key: 'name',
              divide: true,
              media: true,
              children: [
                create(Control, {
                  key: 'name_given',
                  label: 'First Name',
                  error: schema.error('name_given'),
                  children: create(InputString, {
                    value: schema.value('name_given'),
                    change: schema.change('name_given'),
                    placeholder: 'Fred',
                  }),
                }),
                create(Control, {
                  key: 'name_family',
                  label: 'Last Name',
                  error: schema.error('name_family'),
                  children: create(InputString, {
                    value: schema.value('name_family'),
                    change: schema.change('name_family'),
                    placeholder: 'Blogs',
                  }),
                }),
              ],
            }),
            create(Control, {
              key: 'username',
              label: 'Username',
              error: schema.error('username'),
              children: create(InputString, {
                value: schema.value('username'),
                change: schema.change('username'),
                placeholder: 'example_username_123',
              }),
            }),
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
  email: yup
    .string()
    .email('Please make sure you have used a valid email address'),
})

const useGetUser = createUseServer<{
  user: {
    name_given: string
    name_family: string
    username: string
    email: string
  }
}>({
  query: `
    query GetUser($id: String!) {
      user: GetUser(id: $id) {
        name_given
        name_family
        username
        email
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
