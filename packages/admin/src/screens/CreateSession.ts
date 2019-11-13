import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  InputSelect,
} from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const CreateSession: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const global = useGlobal()
  const gqlCreateSession = useCreateSession()
  const gqlListUsers = useListUsers()
  const schema = useSchema({
    schema: SchemaCreateSession,
    submit: value => {
      gqlCreateSession
        .fetch({ value })
        .then(({ session }) => change && change(session.id))
    },
  })
  useEffect(() => {
    gqlListUsers.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Gadgets, {
    title: 'Create Session',
    subtitle: global.appname,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        create(Control, {
          key: 'name',
          label: 'Name',
          error: schema.error('name'),
          children: create(InputString, {
            value: schema.value('name'),
            change: schema.change('name'),
            placeholder: 'Awesome People',
          }),
        }),
        create(Control, {
          key: 'tag',
          label: 'Tag',
          helper: 'A unique identifier for the session',
          error: schema.error('tag'),
          children: create(InputString, {
            value: schema.value('tag'),
            change: schema.change('tag'),
            placeholder: 'awesome-people',
          }),
        }),
        create(Control, {
          key: 'description',
          label: 'Description',
          error: schema.error('description'),
          children: create(InputString, {
            value: schema.value('description'),
            change: schema.change('description'),
            placeholder: 'We do...',
          }),
        }),
        create(Control, {
          key: 'user_id',
          label: 'Admin User',
          error: schema.error('user_id'),
          children: create(InputSelect, {
            value: schema.value('user_id'),
            change: schema.change('user_id'),
            placeholder: 'Select user...',
            filter: regex => gqlListUsers.fetch({ regex }),
            options: !gqlListUsers.data
              ? []
              : gqlListUsers.data.users.map(user => ({
                  value: user.id,
                  label:
                    user.name && user.username
                      ? `${user.name} (${user.username})`
                      : user.name || user.username,
                  helper: user.email,
                })),
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Create',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateSession = yup.object().shape({
  name: yup.string().required('Please provide the session name'),
  tag: yup.string().required('Please provide the session tag'),
  description: yup.string(),
  user_id: yup.string().required('Please select an admin user'),
})

const useCreateSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation apiCreateSession($value: CreateSessionValue!) {
      session: apiCreateSession(value: $value) {
        id
      }
    }
  `,
})

const useListUsers = createUseServer<{
  users: Array<{
    id: string
    name: string
    email: string
    username: string
  }>
}>({
  query: `
    query apiListUsers($regex: String) {
      users: apiListUsers(regex: $regex, options: { limit: 5 }) {
        id
        name
        email
        username
      }
    }
  `,
})