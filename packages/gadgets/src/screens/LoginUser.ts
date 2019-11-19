import * as yup from 'yup'
import { createElement as create, FC, useEffect, useState } from 'react'
import {
  Gadgets,
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
} from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'
import { useOauthCode } from '../hooks/useOauthCode'

export const LoginUser: FC = () => {
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlLoginUser = useLoginUser()
  const gqlListProviders = useListProviders()
  const gqlLoginOauthUser = useLoginOauthUser()
  const [current, currentChange] = useState<string | undefined>()
  const schema = useSchema({
    schema: SchemaLoginUser,
    submit: value => {
      gqlLoginUser.fetch(value).then(({ session }) => {
        schema.change('password')('')
        SettingsStore.update({
          open: false,
          bearer: `Bearer ${session.token}`,
        })
      })
    },
  })
  useEffect(() => {
    gqlListProviders.fetch()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (current && oauthCode.code) {
      gqlLoginOauthUser
        .fetch({
          provider_id: current,
          code: oauthCode.code,
        })
        .then(({ session }) => {
          SettingsStore.update({
            open: false,
            bearer: `Bearer ${session.token}`,
          })
        })
        .finally(() => {
          currentChange(undefined)
          oauthCode.clearCode()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.code])
  return create(Gadgets, {
    title: 'Login',
    subtitle: settings.app && settings.app.name,
    loading:
      gqlLoginUser.loading ||
      gqlListProviders.loading ||
      gqlLoginOauthUser.loading,
    children: create(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        gqlListProviders.data &&
          gqlListProviders.data.providers.map(provider => {
            return create(Button, {
              key: provider.id,
              icon: provider.preset,
              label: provider.name || provider.preset,
              prefix: 'fab',
              click: () => {
                currentChange(provider.id)
                oauthCode.openUrl(provider.url)
              },
            })
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
        create(Control, {
          key: 'password',
          label: 'Password',
          error: schema.error('password'),
          children: create(InputString, {
            value: schema.value('password'),
            change: schema.change('password'),
            placeholder: '* * * * * * * *',
            password: true,
          }),
        }),
        create(Button, {
          key: 'submit',
          label: 'Login',
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaLoginUser = yup.object().shape({
  email: yup
    .string()
    .email('Please make sure you have used a valid email address')
    .required('Please provide your email'),
  password: yup.string().required('Please provide your password'),
})

const useLoginUser = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation wgaLoginUser($email: String!, $password: String!) {
      session: wgaLoginUser(email: $email, password: $password) {
        id
        token
      }
    }
  `,
})

const useLoginOauthUser = createUseServer<{
  session: {
    id: string
    token: string
  }
}>({
  query: `
    mutation wgaLoginOauthUser($provider_id: String!, $code: String!) {
      session: wgaLoginOauthUser(provider_id: $provider_id, code: $code) {
        id
        token
      }
    }
  `,
})

const useListProviders = createUseServer<{
  providers: Array<{
    id: string
    preset: string
    name?: string
    url: string
  }>
}>({
  query: `
    query wgaListProviders {
      providers: wgaListProviders {
        id
        preset
        name
        url
      }
    }
  `,
})
