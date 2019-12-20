import * as yup from 'yup'
import { createElement as element, FC, useEffect, useState } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  InputStringArray,
  Poster,
  Page,
  Button,
  useToaster,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateProvider: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const toaster = useToaster()
  const gqlGetProvider = useGetProvider()
  const gqlUpdateProvider = useUpdateProvider()
  const [details, detailsChange] = useState<
    { name: string; preset: string } | undefined
  >()
  const schema = useSchema({
    schema: SchemaUpdateProvider,
    submit: value => {
      gqlUpdateProvider.fetch({ id, value }).then(({ provider }) => {
        if (change) change(provider.id)
        toaster.add({ icon: 'check-circle', label: 'Success' })
      })
    },
  })
  useEffect(() => {
    gqlGetProvider
      .fetch({ id })
      .then(({ provider: { name, preset, ...provider } }) => {
        detailsChange({ name, preset })
        schema.set(provider)
      })
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Provider',
    children: [
      details &&
        element(Poster, {
          key: 'poster',
          icon: details.preset,
          prefix: 'fab',
          label: details.name,
          helper: 'Update provider details',
        }),
      element(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: !gqlGetProvider.data
          ? null
          : [
              element(Control, {
                key: 'client',
                label: 'Client Id',
                helper: `The oauth client id provided by ${schema.value(
                  'preset'
                ) || 'the app'}`,
                error: schema.error('client'),
                children: element(InputString, {
                  value: schema.value('client'),
                  change: schema.change('client'),
                  placeholder: '...',
                }),
              }),
              element(Control, {
                key: 'secret',
                label: 'Secret',
                helper: `This value has been hidden`,
                error: schema.error('secret'),
                children: element(InputString, {
                  value: schema.value('secret'),
                  change: schema.change('secret'),
                  placeholder: '...',
                }),
              }),
              element(Control, {
                key: 'scopes',
                label: 'Scopes',
                helper: 'A set of oauth permission scopes',
                error: schema.error('scopes'),
                children: element(InputStringArray, {
                  value: schema.value('scopes'),
                  change: schema.change('scopes'),
                  placeholder: '...',
                }),
              }),
              element(Control, {
                key: 'redirect_uri',
                label: 'Advanced Redirect URI',
                helper:
                  'Leave this empty unless you are creating your own login system',
                error: schema.error('redirect_uri'),
                children: element(InputString, {
                  value: schema.value('redirect_uri'),
                  change: schema.change('redirect_uri'),
                  placeholder: 'https://gadgets.v1.authpack.io',
                }),
              }),
              element(Button, {
                key: 'submit',
                label: 'Save',
                loading: gqlGetProvider.loading || gqlUpdateProvider.loading,
                disabled: !schema.valid,
                click: schema.submit,
              }),
            ],
      }),
    ],
  })
}

const SchemaUpdateProvider = yup.object().shape({
  client: yup.string().required('Please provide the oauth client id'),
  secret: yup.string(),
  redirect_uri: yup.string(),
  scopes: yup
    .array()
    .of(yup.string().required())
    .default([]),
})

const useGetProvider = createUseServer<{
  provider: {
    name: string
    preset: string
    client: string
    redirect_uri: string
    scopes: string[]
  }
}>({
  query: `
    query GetProvider($id: String!) {
      provider: GetProvider(id: $id) {
        name
        preset
        client
        redirect_uri
        scopes
      }
    }
  `,
})

const useUpdateProvider = createUseServer<{
  provider: {
    id: string
  }
}>({
  query: `
    mutation UpdateProvider($id: String!, $value: UpdateProviderValue!) {
      provider: UpdateProvider(id: $id, value: $value) {
        id
      }
    }
  `,
})
