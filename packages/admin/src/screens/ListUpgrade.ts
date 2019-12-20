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
import { RouterManagerUpgrade } from './RouterManagerUpgrade'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListUpgrades: FC = () => {
  const gqlListUpgrades = useListUpgrades()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({ options: { sort: 'created' } })
  const queryListUpgrades = useRef(drip(1000, gqlListUpgrades.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListUpgrades.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListUpgrades.data && gqlListUpgrades.data.count
      ? gqlListUpgrades.data.upgrades
      : variables.phrase ||
        Boolean(gqlListUpgrades.data && !gqlListUpgrades.data.upgrades)
      ? []
      : FakeUpgrades
  return element(Page, {
    title: 'Upgrades',
    subtitle: 'Accept payment from your users',
    hidden: !gqlListUpgrades.data || !gqlListUpgrades.data.count,
    corner: {
      icon: 'plus',
      label: 'New Upgrade',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListUpgrades.data && gqlListUpgrades.data.count,
      current: gqlListUpgrades.data && gqlListUpgrades.data.upgrades.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerUpgrade, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListUpgrades.current(variables)
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
      gqlListUpgrades.data &&
        !gqlListUpgrades.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'user-shield',
          label: 'Upgrades',
          helper: 'Create a upgrade manually or by using the Authpack API',
          children: element(Button, {
            key: 'Regular',
            icon: 'book',
            label: 'Install',
            click: () =>
              window.open(
                'https://github.com/jackrobertscott/authpack/blob/master/readme.md'
              ),
          }),
        }),
      gqlListUpgrades.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'name', label: 'Name' },
            { key: 'tag', label: 'Tag' },
            { key: 'description', label: 'Description' },
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
              { icon: 'users', value: data.name },
              { icon: 'fingerprint', value: data.tag || '...' },
              { icon: 'book', value: data.description || '...' },
              {
                icon: 'clock',
                value: format(new Date(data.updated), 'dd LLL yyyy @ h:mm a'),
              },
            ],
          })),
        }),
    ],
  })
}

const useListUpgrades = createUseServer<{
  count: number
  upgrades: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListUpgrades($phrase: String, $options: WhereOptions) {
      count: CountUpgrades(phrase: $phrase)
      upgrades: ListUpgrades(phrase: $phrase, options: $options) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})

const FakeUpgrades: Array<{
  id: string
  updated: string
  name: string
  tag: string
  description?: string
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  updated: faker.date.recent(100).toDateString(),
  name: faker.random.words(2),
  tag: faker.internet.userName(),
  description: faker.random.words(5),
}))
