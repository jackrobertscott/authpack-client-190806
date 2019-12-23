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
import { RouterManagerRole } from './RouterManagerRole'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListRoles: FC = () => {
  const gqlListRoles = useListRoles()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({ options: { sort: 'created' } })
  const queryListRoles = useRef(drip(1000, gqlListRoles.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListRoles.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const list =
    gqlListRoles.data && gqlListRoles.data.count
      ? gqlListRoles.data.roles
      : variables.phrase ||
        Boolean(gqlListRoles.data && !gqlListRoles.data.roles)
      ? []
      : FakeRoles
  return element(Page, {
    title: 'Roles',
    subtitle: 'Restrict team member abilities',
    hidden: !gqlListRoles.data || !gqlListRoles.data.count,
    corner: {
      icon: 'plus',
      label: 'New Role',
      click: () => {
        buildChange(true)
        setTimeout(() => idcurrentChange(undefined), 200) // animation
      },
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListRoles.data && gqlListRoles.data.count,
      current: gqlListRoles.data && gqlListRoles.data.roles.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerRole, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListRoles.current(variables)
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
      gqlListRoles.data &&
        !gqlListRoles.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'user-shield',
          label: 'Roles',
          helper: 'Create a role manually or by using the Authpack API',
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
      gqlListRoles.data &&
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

const useListRoles = createUseServer<{
  count: number
  roles: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListRoles($phrase: String, $options: WhereOptions) {
      count: CountRoles(phrase: $phrase)
      roles: ListRoles(phrase: $phrase, options: $options) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})

const FakeRoles: Array<{
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
