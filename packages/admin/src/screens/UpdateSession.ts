import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import { useSchema, Layout, Control, InputBoolean, Page } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlGetSession = useGetSession()
  const gqlUpdateSession = useUpdateSession()
  const schema = useSchema({
    schema: SchemaUpdateSession,
    poller: value => {
      gqlUpdateSession
        .fetch({ id, value })
        .then(({ session }) => change && change(session.id))
    },
  })
  useEffect(() => {
    gqlGetSession.fetch({ id }).then(({ session }) => schema.set(session))
    // eslint-disable-next-line
  }, [id])
  return create(Page, {
    title: 'Update',
    subtitle: 'Session',
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetSession.data
        ? null
        : [
            create(Control, {
              key: 'disabled',
              label: 'Disabled',
              helper: 'Prevent session from authenticating api requests',
              error: schema.error('disabled'),
              children: create(InputBoolean, {
                value: schema.value('disabled'),
                change: schema.change('disabled'),
              }),
            }),
          ],
    }),
  })
}

const SchemaUpdateSession = yup.object().shape({
  disabled: yup
    .boolean()
    .required('Please provide the current disabled status'),
})

const useGetSession = createUseServer<{
  session: {
    disabled: string
  }
}>({
  query: `
    query GetSession($id: String!) {
      session: GetSession(id: $id) {
        disabled
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
    mutation UpdateSession($id: String!, $value: UpdateSessionValue!) {
      session: UpdateSession(id: $id, value: $value) {
        id
      }
    }
  `,
})
