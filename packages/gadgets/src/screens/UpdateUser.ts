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
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const UpdateUser: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const settings = useSettings()
  const gqlGetUser = useGetUser()
  const gqlUpdateUser = useUpdateUser()
  const schema = useSchema({
    schema: SchemaUpdateUser,
    poller: input => {
      gqlUpdateUser
        .fetch({ input })
        .then(({ user }) => change && change(user.id))
    },
  })
  useEffect(() => {
    gqlGetUser.fetch().then(({ user }) => schema.set(user))
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Update User',
    subtitle: settings.app && settings.app.name,
    loading: gqlGetUser.loading || gqlUpdateUser.loading,
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
                  key: 'given_name',
                  label: 'First Name',
                  error: schema.error('given_name'),
                  children: create(InputString, {
                    value: schema.value('given_name'),
                    change: schema.change('given_name'),
                    placeholder: 'Fred',
                  }),
                }),
                create(Control, {
                  key: 'family_name',
                  label: 'Last Name',
                  error: schema.error('family_name'),
                  children: create(InputString, {
                    value: schema.value('family_name'),
                    change: schema.change('family_name'),
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
  given_name: yup.string(),
  family_name: yup.string(),
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
    given_name: string
    family_name: string
    username: string
    email: string
  }
}>({
  query: `
    query wgaGetCurrentUser {
      user: wgaGetCurrentUser {
        given_name
        family_name
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
    mutation wgaUpdateCurrentUser($input: UpdateCurrentUserInput!) {
      user: wgaUpdateCurrentUser(input: $input) {
        id
      }
    }
  `,
})
