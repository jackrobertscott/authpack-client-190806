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
import { RouterManagerWebhook } from './RouterManagerWebhook'
import { TemplateSearchBar } from '../templates/TemplateSearchBar'
import { createUseServer } from '../hooks/useServer'
import { WEBHOOKEVENTS } from '../utils/webhooks'

export const ListWebhooks: FC = () => {
  const gqlListWebhooks = useListWebhooks()
  const [build, buildChange] = useState<boolean>(false)
  const [idcurrent, idcurrentChange] = useState<string | undefined>()
  const [variables, variablesChange] = useState<{
    options: { [key: string]: any }
    phrase?: string
  }>({ options: { sort: 'created' } })
  const queryListWebhooks = useRef(drip(1000, gqlListWebhooks.fetch))
  useEffect(() => {
    if (variables.options.limit) queryListWebhooks.current(variables)
    // eslint-disable-next-line
  }, [variables])
  const newWebhook = () => {
    buildChange(true)
    setTimeout(() => idcurrentChange(undefined), 200) // animation
  }
  const list =
    gqlListWebhooks.data && gqlListWebhooks.data.count
      ? gqlListWebhooks.data.webhooks
      : variables.phrase ||
        Boolean(gqlListWebhooks.data && !gqlListWebhooks.data.webhooks)
      ? []
      : FakeWebhooks
  return element(Page, {
    title: 'Webhooks',
    subtitle: 'Trigger urls to be called when an event occurs',
    hidden: !gqlListWebhooks.data || !gqlListWebhooks.data.count,
    corner: {
      icon: 'plus',
      label: 'New Webhook',
      click: newWebhook,
    },
    noscroll: element(TemplateSearchBar, {
      count: gqlListWebhooks.data && gqlListWebhooks.data.count,
      current: gqlListWebhooks.data && gqlListWebhooks.data.webhooks.length,
      change: (phrase, limit, skip) => {
        variablesChange({
          ...variables,
          options: { ...variables.options, limit, skip },
          phrase,
        })
      },
    }),
    children: [
      element(RouterManagerWebhook, {
        key: 'router',
        id: idcurrent,
        visible: build,
        change: id => {
          queryListWebhooks.current(variables)
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
      gqlListWebhooks.data &&
        !gqlListWebhooks.data.count &&
        element(Empty, {
          key: 'empty',
          icon: 'sitemap',
          label: 'Webhooks',
          helper: 'Would you like to create a webhook?',
          children: element(Button, {
            key: 'Regular',
            icon: 'plus',
            label: 'New Webhook',
            click: newWebhook,
          }),
        }),
      gqlListWebhooks.data &&
        element(Table, {
          key: 'table',
          header: [
            { key: 'event', label: 'Event' },
            { key: 'url', label: 'Url' },
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
              { icon: 'hashtag', value: data.event },
              { icon: 'wifi', value: data.url },
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

const useListWebhooks = createUseServer<{
  count: number
  webhooks: Array<{
    id: string
    created: string
    updated: string
    event: string
    url: string
  }>
}>({
  query: `
    query ListWebhooks($phrase: String, $options: WhereOptions) {
      count: CountWebhooks(phrase: $phrase)
      webhooks: ListWebhooks(phrase: $phrase, options: $options) {
        id
        created
        updated
        event
        url
      }
    }
  `,
})

const FakeWebhooks: Array<{
  id: string
  created: string
  updated: string
  event: string
  url: string
}> = Array.from(Array(8).keys()).map(() => ({
  id: faker.random.uuid(),
  created: faker.date.recent(100).toDateString(),
  updated: faker.date.recent(100).toDateString(),
  event: WEBHOOKEVENTS[Math.floor(Math.random() * WEBHOOKEVENTS.length)],
  url: faker.internet.url(),
}))
