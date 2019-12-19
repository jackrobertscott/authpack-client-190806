import * as yup from 'yup'
import { createElement as element, FC, useEffect, useState } from 'react'
import {
  useSchema,
  Layout,
  Control,
  InputString,
  Page,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { WEBHOOKEVENTS } from '../utils/webhooks'

export const UpdateWebhook: FC<{
  id: string
  change?: (id?: string) => void
}> = ({ id, change }) => {
  const [filter, filterChange] = useState<string>('')
  const gqlGetWebhook = useGetWebhook()
  const gqlUpdateWebhook = useUpdateWebhook()
  const schema = useSchema({
    schema: SchemaUpdateWebhook,
    poller: value => {
      gqlUpdateWebhook
        .fetch({ id, value })
        .then(({ webhook }) => change && change(webhook.id))
    },
  })
  useEffect(() => {
    gqlGetWebhook.fetch({ id }).then(({ webhook }) => schema.set(webhook))
    // eslint-disable-next-line
  }, [id])
  return element(Page, {
    title: 'Update',
    subtitle: 'Webhook',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: !gqlGetWebhook.data
        ? null
        : [
            element(Control, {
              key: 'event',
              label: 'Event',
              helper: 'The event which will trigger the url to be called',
              error: schema.error('event'),
              children: element(InputSelect, {
                value: schema.value('event'),
                change: schema.change('event'),
                filter: filterChange,
                options: EventOptions.filter(event =>
                  event.label.includes(filter)
                ),
              }),
            }),
            element(Control, {
              key: 'url',
              label: 'Url',
              helper: 'This will be sent the id of the changed item',
              error: schema.error('url'),
              children: element(InputString, {
                value: schema.value('url'),
                change: schema.change('url'),
                placeholder: 'https://exmaple.com/webhooks',
              }),
            }),
          ],
    }),
  })
}

const SchemaUpdateWebhook = yup.object().shape({
  event: yup
    .string()
    .oneOf(WEBHOOKEVENTS)
    .required('Please provide a preset'),
  url: yup.string().required('Please ensure you include a url'),
})

const useGetWebhook = createUseServer<{
  webhook: {
    event: string
    url: string
  }
}>({
  query: `
    query GetWebhook($id: String!) {
      webhook: GetWebhook(id: $id) {
        event
        url
      }
    }
  `,
})

const useUpdateWebhook = createUseServer<{
  webhook: {
    id: string
  }
}>({
  query: `
    mutation UpdateWebhook($id: String!, $value: UpdateWebhookValue!) {
      webhook: UpdateWebhook(id: $id, value: $value) {
        id
      }
    }
  `,
})

const EventOptions = WEBHOOKEVENTS.map(event => ({
  value: event,
  label: event,
}))
