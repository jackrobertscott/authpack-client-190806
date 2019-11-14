import faker from 'faker'
import { createElement as create, FC, useState, useEffect, useRef } from 'react'
import { Page, Table, Empty, Button, Focus, drip } from 'wga-theme'
import { format } from 'date-fns'
import { RouterManagerProvider } from '../routers/RouterManagerProvider'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC = () => {
  const apiListProviders = useListProviders()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{ [key: string]: any }>({})
  const queryListProviders = useRef(drip(1000, apiListProviders.fetch))
  useEffect(() => {
    if (variables) queryListProviders.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    apiListProviders.data && apiListProviders.data.count
      ? apiListProviders.data.providers
      : FakeProviders
  return create(Page, {
    title: 'Providers',
    subtitle: 'See all providers of your app',
    hidden: !apiListProviders.data || !apiListProviders.data.count,
    corner: {
      icon: 'plus',
      label: 'Create Provider',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: create(TemplateSearchBar, {
      count: apiListProviders.data && apiListProviders.data.count,
      current: apiListProviders.data && apiListProviders.data.providers.length,
      change: (search, limit, skip) => {
        variablesChange({
          phrase: search,
          options: { ...(variables.options || {}), limit, skip },
        })
      },
    }),
    children: [
      create(RouterManagerProvider, {
        key: 'router',
        id: idcurrent,
        change: id => {
          if (variables) queryListProviders.current(variables)
          if (id) {
            idcurrentChange(id)
          } else {
            buildChange(false)
            setTimeout(() => idcurrentChange(undefined), 200) // animation
          }
        },
        close: () => {
          buildChange(false)
          setTimeout(() => idcurrentChange(undefined), 200) // animation
        },
        visible: build,
      }),
      create(Table, {
        key: 'table',
        header: [
          { key: 'preset', label: 'Preset' },
          { key: 'scopes', label: 'Scopes' },
          { key: 'updated', label: 'Updated' },
        ].map(({ key, label }) => ({
          label,
          icon:
            variables.options && variables.options.sort === key
              ? variables.options.reverse
                ? 'chevron-down'
                : 'chevron-up'
              : 'equals',
          click: () =>
            variablesChange(({ options = {}, ...data }) => ({
              ...data,
              options: { ...options, sort: key, reverse: !options.reverse },
            })),
        })),
        rows: list.map(data => ({
          id: data.id,
          click: () => {
            idcurrentChange(data.id)
            buildChange(true)
          },
          cells: [
            { icon: 'share-alt', value: data.preset },
            { icon: 'user-shield', value: data.scopes.join(', ') || '...' },
            {
              icon: 'clock',
              value: format(new Date(data.updated), 'dd LLL yyyy @ h:mm a'),
            },
          ],
        })),
      }),
      !apiListProviders.data
        ? create(Focus, {
            key: 'loading',
            icon: 'sync-alt',
            label: 'Loading',
          })
        : !apiListProviders.data.count &&
          create(Empty, {
            key: 'empty',
            icon: 'facebook',
            prefix: 'fab',
            label: 'Providers',
            helper:
              'Create a provider manually or by using the Authenticator API',
            children: create(Button, {
              key: 'Regular',
              label: 'See API',
              click: () => window.open('https://windowgadgets.io'),
            }),
          }),
    ],
  })
}

const useListProviders = createUseServer<{
  count: number
  providers: Array<{
    id: string
    updated: string
    preset: string
    scopes: string[]
  }>
}>({
  query: `
    query apiListProviders($phrase: String, $options: WhereOptions) {
      count: apiCountProviders(phrase: $phrase)
      providers: apiListProviders(phrase: $phrase, options: $options) {
        id
        updated
        preset
        scopes
      }
    }
  `,
})

const FakeProviders: Array<{
  id: string
  updated: string
  preset: string
  scopes: string[]
}> = Array.from(Array(10).keys()).map(() => ({
  id: faker.random.uuid(),
  updated: faker.date.recent(100).toDateString(),
  preset: faker.random.words(2),
  scopes: faker.random.words(5).split(' '),
}))
