import * as yup from 'yup'
import { createElement as create, FC, useEffect } from 'react'
import { Gadgets, useSchema, Layout, Control, InputBoolean } from 'wga-theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdateSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const universal = useUniversal()
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
  return create(Gadgets, {
    title: 'Update Session',
    subtitle: universal.appname,
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
    query apiGetSession($id: String!) {
      session: apiGetSession(id: $id) {
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
    mutation apiUpdateSession($id: String!, $value: UpdateSessionValue!) {
      session: apiUpdateSession(id: $id, value: $value) {
        id
      }
    }
  `,
})
