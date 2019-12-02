import * as yup from 'yup'
import { createElement as create, FC, useEffect, useState } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  InputStringArray,
  Poster,
  Page,
} from 'wga-theme'
import { createUseServer } from '../hooks/useServer'

export const UpdateProvider: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const gqlGetProvider = useGetProvider()
  const gqlUpdateProvider = useUpdateProvider()
  const [details, detailsChange] = useState<
    { name: string; preset: string } | undefined
  >()
  const schema = useSchema({
    schema: SchemaUpdateProvider,
    poller: value => {
      gqlUpdateProvider
        .fetch({ id, value })
        .then(({ provider }) => change && change(provider.id))
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
  return create(Page, {
    title: 'Update',
    subtitle: 'Provider',
    children: [
      details &&
        create(Poster, {
          key: 'poster',
          icon: details.preset,
          prefix: 'fab',
          label: details.name,
          helper: 'Update provider details',
        }),
      create(Layout, {
        key: 'layout',
        column: true,
        padding: true,
        divide: true,
        children: !gqlGetProvider.data
          ? null
          : [
              create(Control, {
                key: 'client',
                label: 'Client Id',
                helper: `The oauth client id provided by ${schema.value(
                  'preset'
                ) || 'the app'}`,
                error: schema.error('client'),
                children: create(InputString, {
                  value: schema.value('client'),
                  change: schema.change('client'),
                  placeholder: '...',
                }),
              }),
              create(Control, {
                key: 'secret',
                label: 'Secret',
                helper: `This value has been hidden`,
                error: schema.error('secret'),
                children: create(InputString, {
                  value: schema.value('secret'),
                  change: schema.change('secret'),
                  placeholder: '...',
                }),
              }),
              create(Control, {
                key: 'scopes',
                label: 'Scopes',
                helper: 'A set of oauth permission scopes',
                error: schema.error('scopes'),
                children: create(InputStringArray, {
                  value: schema.value('scopes'),
                  change: schema.change('scopes'),
                  placeholder: '...',
                }),
              }),
              create(Control, {
                key: 'redirect_uri',
                label: 'Advanced - Redirect URI',
                helper:
                  'Leave this empty unless you are creating your own login system',
                error: schema.error('redirect_uri'),
                children: create(InputString, {
                  value: schema.value('redirect_uri'),
                  change: schema.change('redirect_uri'),
                  placeholder: 'https://v1.authpack.io',
                }),
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
