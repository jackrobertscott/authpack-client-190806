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
import { RouterManagerPlan } from './RouterManagerPlan'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListPlans: FC = () => {
  const gqlListPlans = useListPlans()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({ options: { sort: 'created' } })
  const queryListPlans = useRef(drip(1000, gqlListPlans.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListPlans.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newPlan = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListPlans.data && gqlListPlans.data.count
      ? gqlListPlans.data.plans
      : variables.phrase ||
        Boolean(gqlListPlans.data && !gqlListPlans.data.plans)
      ? []
      : FakePlans
  return element(Page, {
    title: 'Plans',
    subtitle: 'Accept payment from your users',
    hidden: !gqlListPlans.data || !gqlListPlans.data.count,
    corner: {
      icon: 'plus',
      label: 'New Plan',
      click: newPlan,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListPlans.data && gqlListPlans.data.count,
      current: gqlListPlans.data && gqlListPlans.data.plans.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerPlan, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListPlans.current(variables)
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
      gqlListPlans.data &&
        !gqlListPlans.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'donate',
          label: 'Plans',
          helper: 'Would you like to create an plan?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Plan',
            click: newPlan,
          }),
        }),
      gqlListPlans.data &&
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

const useListPlans = createUseServer<{
  count: number
  plans: Array<{
    id: string
    updated: string
    name: string
    tag: string
    description?: string
  }>
}>({
  query: `
    query ListPlans($phrase: String, $options: WhereOptions) {
      count: CountPlans(phrase: $phrase)
      plans: ListPlans(phrase: $phrase, options: $options) {
        id
        updated
        name
        tag
        description
      }
    }
  `,
})

const FakePlans: Array<{
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
