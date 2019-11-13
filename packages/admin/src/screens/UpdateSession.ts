import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import {
  Gadgets,
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
} from 'wga-theme'
import { useGlobal } from '../hooks/useGlobal'
import { createUseServer } from '../hooks/useServer'

export const UpdateSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const global = useGlobal()
  const gqlGetSession = useGetSession()
  const gqlUpdateSession = useUpdateSession()
  const schema = useSchema({
    schema: SchemaUpdateSession,
    submit: value => {
      gqlUpdateSession
        .fetch({ id, value })
        .then(({ session }) => change && change(session.id))
    },
  })
  useEffect(() => {
    gqlGetSession.fetch({ id }).then(({ session }) => schema.set(session))
    // eslint-disable-next-line
  }, [id])
  return create(Gadgets, {
    title: 'Update Session',
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
        create(Button, {
          key: 'submit',
          label: 'Update',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaUpdateSession = yup.object().shape({
  name: yup.string().required('Please provide the session name'),
  tag: yup.string().required('Please provide the session tag'),
  description: yup.string(),
})

const useGetSession = createUseServer<{
  session: {
    name: string
    tag: string
    description?: string
  }
}>({
  query: `
    query apiGetSession($id: String!) {
      session: apiGetSession(id: $id) {
        name
        tag
        description
      }
    }
  `,
})

const useUpdateSession = createUseServer<{
  session: {
    id: string
  }
}>({
  query: `
    mutation apiUpdateSession($id: String!, $value: UpdateSessionValue!) {
      session: apiUpdateSession(id: $id, value: $value) {
        id
      }
    }
  `,
})
