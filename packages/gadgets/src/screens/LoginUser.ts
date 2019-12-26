import * as yup from 'yup'
import { createElement as element, FC, useEffect } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Button,
  useMounted,
  Page,
  Focus,
  useOauthCode,
} from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { SettingsStore } from '../utils/settings'
import { createUseServer } from '../hooks/useServer'
import { presetColors } from '../utils/presets'

export const LoginUser: FC = () => {
  const mounted = useMounted()
  const settings = useSettings()
  const oauthCode = useOauthCode()
  const gqlLoginUser = useLoginUser()
  const gqlListProviders = useListProviders()
  const gqlLoginUserOauth = useLoginUserOauth()
  const schema = useSchema({
    schema: SchemaLoginUser,
    submit: value => {
      gqlLoginUser.fetch(value).then(({ session }) => {
        SettingsStore.update({
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
    if (oauthCode.current && oauthCode.code) {
      gqlLoginUserOauth
        .fetch({
          provider_id: oauthCode.current,
          code: oauthCode.code,
        })
        .then(({ session }) => {
          SettingsStore.update({
            bearer: `Bearer ${session.token}`,
          })
        })
        .finally(() => {
          if (!mounted.current) return
          oauthCode.clear()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.current, oauthCode.code])
  return element(Page, {
    title: 'Login',
    subtitle: settings.cluster && settings.cluster.name,
    children: oauthCode.current
      ? element(Focus, {
          icon: 'sync-alt',
          label: 'Pending',
          helper: 'Waiting for login with external app',
          children: element(Button, {
            icon: 'times-circle',
            label: 'Cancel',
            click: () => oauthCode.clear(),
          }),
        })
      : !gqlListProviders.data
      ? null
      : [
          !!gqlListProviders.data.providers.length &&
            element(Layout, {
              key: 'oauth',
              column: true,
              padding: true,
              divide: true,
              styled: true,
              children: gqlListProviders.data.providers.map(provider => {
                return element(Button, {
                  key: provider.id,
                  icon: provider.preset,
                  label: provider.name || provider.preset,
                  prefix: 'fab',
                  style: presetColors(provider.preset),
                  click: () => oauthCode.open(provider.id, provider.url),
                })
              }),
            }),
          element(Layout, {
            key: 'form',
            column: true,
            padding: true,
            divide: true,
            children: [
              element(Control, {
                key: 'email',
                label: 'Email',
                error: schema.error('email'),
                children: element(InputString, {
                  value: schema.value('email'),
                  change: schema.change('email'),
                  placeholder: 'example@email.com',
                }),
              }),
              element(Control, {
                key: 'password',
                label: 'Password',
                error: schema.error('password'),
                children: element(InputString, {
                  value: schema.value('password'),
                  change: schema.change('password'),
                  placeholder: '* * * * * * * *',
                  password: true,
                }),
              }),
              element(Button, {
                key: 'submit',
                label: 'Login',
                loading: gqlLoginUser.loading || gqlLoginUserOauth.loading,
                disabled: !schema.valid,
                click: schema.submit,
              }),
            ],
          }),
        ],
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
    token: string
  }
}>({
  query: `
    mutation LoginUserClient($email: String!, $password: String!) {
      session: LoginUserClient(email: $email, password: $password) {
        token
      }
    }
  `,
})

const useLoginUserOauth = createUseServer<{
  session: {
    token: string
  }
}>({
  query: `
    mutation LoginUserOauthClient($provider_id: String!, $code: String!) {
      session: LoginUserOauthClient(provider_id: $provider_id, code: $code) {
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
    query ListProvidersClient {
      providers: ListProvidersClient {
        id
        preset
        name
        url
      }
    }
  `,
})
