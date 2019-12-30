import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputBoolean,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateSession: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetSession = useGetSession()
  const gqlUpdateSession = useUpdateSession()
  const schema = useSchema({
    schema: SchemaUpdateSession,
    submit: value => {
      gqlUpdateSession.fetch({ id, value }).then(({ session }) => {
        if (change) change(session.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetSession.fetch({ id }).then(({ session }) => schema.set(session))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Session',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetSession.data
        ? null
        : [
            element(Control, {
              key: 'disabled',
              label: 'Disabled',
              helper: 'Prevent session from authenticating api requests',
              error: schema.error('disabled'),
              children: element(InputBoolean, {
                value: schema.value('disabled'),
                change: schema.change('disabled'),
              }),
            }),
            element(Button, {
              key: 'submit',
              label: 'Save',
              loading: gqlGetSession.loading || gqlUpdateSession.loading,
              disabled: !schema.valid,
              click: schema.submit,
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
