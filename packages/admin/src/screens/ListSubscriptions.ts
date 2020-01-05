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
import { RouterManagerSubscription } from './RouterManagerSubscription'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'

export const ListSubscriptions: FC = () => {
  const gqlListSubscriptions = useListSubscriptions()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
  }>({
    options: { sort: 'created' },
  })
  const queryListSubscriptions = useRef(drip(1000, gqlListSubscriptions.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListSubscriptions.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newSubscription = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListSubscriptions.data && gqlListSubscriptions.data.count
      ? gqlListSubscriptions.data.subscriptions
      : Boolean(
          gqlListSubscriptions.data && !gqlListSubscriptions.data.subscriptions
        )
      ? []
      : FakeSubscriptions
  return element(Page, {
    title: 'Subscriptions',
    subtitle: 'Recurring payments',
    hidden: !gqlListSubscriptions.data || !gqlListSubscriptions.data.count,
    corner: {
      icon: 'plus',
      label: 'New Subscription',
      click: newSubscription,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListSubscriptions.data && gqlListSubscriptions.data.count,
      current:
        gqlListSubscriptions.data &&
        gqlListSubscriptions.data.subscriptions.length,
      input: false,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
        })
      },
    }),
    children: [
      element(RouterManagerSubscription, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListSubscriptions.current(variables)
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
      gqlListSubscriptions.data &&
        !gqlListSubscriptions.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'users',
          label: 'Subscriptions',
          helper: 'Would you like to create a subscription?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Subscription',
            click: newSubscription,
          }),
        }),
      gqlListSubscriptions.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'user', label: 'User' },
            { key: 'plan', label: 'Plan' },
            { key: 'cancellation_requested', label: 'Cancelling' },
            { key: 'cancelled', label: 'Cancelled' },
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
              {
                icon: 'user',
                value: data.user ? data.user.summary : '...',
              },
              {
                icon: 'dollar-sign',
                value: data.plan ? data.plan.summary : '...',
              },
              { icon: 'hourglass', value: String(data.cancellation_requested) },
              { icon: 'power-off', value: String(data.cancelled) },
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

const useListSubscriptions = createUseServer<{
  count: number
  subscriptions: Array<{
    id: string
    created: string
    updated: string
    cancellation_requested: boolean
    cancelled: boolean
    user: {
      summary: string
    }
    plan: {
      summary: string
    }
  }>
}>({
  query: `
    query ListSubscriptions($options: WhereOptions) {
      count: CountSubscriptions
      subscriptions: ListSubscriptions(options: $options) {
        id
        created
        updated
        cancellation_requested
        cancelled
        user {
          summary
        }
        plan {
          summary
        }
      }
    }
  `,
})

const FakeSubscriptions: Array<{
  id: string
  created: string
  updated: string
  cancellation_requested: boolean
  cancelled: boolean
  user: {
    summary: string
  }
  plan: {
    summary: string
  }
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  updated: faker.date.recent(100).toDateString(),
  cancellation_requested: false,
  cancelled: false,
  user: {
    summary: faker.random.words(2),
  },
  plan: {
    summary: faker.random.words(2),
  },
}))
