import faker from 'faker'
import {
  createElement as element,
  FC,
  useState,
  useEffect,
  useRef,
} from 'react'
import { Page, Table, Empty, Button, drip } from '@authpack/theme'
import { format } from 'date-fns'
import { RouterManagerProvider } from './RouterManagerProvider'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC = () => {
  const gqlListProviders = useListProviders()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({ options: { sort: 'created' } })
  const queryListProviders = useRef(drip(1000, gqlListProviders.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListProviders.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newProvider = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListProviders.data && gqlListProviders.data.count
      ? gqlListProviders.data.providers
      : variables.phrase ||
        Boolean(gqlListProviders.data && !gqlListProviders.data.providers)
      ? []
      : FakeProviders
  return element(Page, {
    title: 'Providers',
    subtitle: 'Login with Facebook, Google, GitHub and more',
    hidden: !gqlListProviders.data || !gqlListProviders.data.count,
    corner: {
      icon: 'plus',
      label: 'New Provider',
      click: newProvider,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListProviders.data && gqlListProviders.data.count,
      current: gqlListProviders.data && gqlListProviders.data.providers.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerProvider, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListProviders.current(variables)
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
      }),
      gqlListProviders.data &&
        !gqlListProviders.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'facebook',
          prefix: 'fab',
          label: 'Providers',
          helper: 'Would you like to create a provider?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Provider',
            click: newProvider,
          }),
        }),
      gqlListProviders.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'preset', label: 'Preset' },
            { key: 'scopes', label: 'Scopes' },
            { key: 'updated', label: 'Updated' },
            { key: 'created', label: 'Created' },
          ].map(({ key, label }) => ({
            label,
            icon:
              variables.options && variables.options.sort === key
                ? variables.options.reverse
                  ? 'chevron-down'
                  : 'chevron-up'
                : 'equals',
            click: () =>
              variablesChange({
                ...variables,
                options: {
                  ...variables.options,
                  sort: key,
                  reverse: !variables.options.reverse,
                },
              }),
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
                value: format(new Date(data.updated), 'dd LLL h:mm a'),
              },
              {
                icon: 'clock',
                value: format(new Date(data.created), 'dd LLL h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListProviders = createUseServer<{
  count: number
  providers: Array<{
    id: string
    created: string
    updated: string
    preset: string
    scopes: string[]
  }>
}>({
  query: `
    query ListProviders($phrase: String, $options: WhereOptions) {
      count: CountProviders(phrase: $phrase)
      providers: ListProviders(phrase: $phrase, options: $options) {
        id
        created
        updated
        preset
        scopes
      }
    }
  `,
})

const FakeProviders: Array<{
  id: string
  created: string
  updated: string
  preset: string
  scopes: string[]
}> = Array.from(Array(4).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  updated: faker.date.recent(100).toDateString(),
  preset: faker.random.words(2),
  scopes: faker.random.words(3).split(' '),
}))
