import * as yup from 'yup'
import { createElement as element, FC, useState } from 'react'
import {
  useSchema,
  Button,
  Layout,
  Control,
  InputString,
  Page,
  InputSelect,
} from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { WEBHOOKEVENTS } from '../utils/webhooks'

export const CreateWebhook: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const [filter, filterChange] = useState<string>('')
  const gqlCreateWebhook = useCreateWebhook()
  const schema = useSchema({
    schema: SchemaCreateWebhook,
    submit: value => {
      gqlCreateWebhook
        .fetch({ value })
        .then(({ webhook }) => change && change(webhook.id))
    },
  })
  return element(Page, {
    title: 'New',
    subtitle: 'Webhook',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Control, {
          key: 'event',
          label: 'Event',
          helper: 'The event which will trigger the url to be called',
          error: schema.error('event'),
          children: element(InputSelect, {
            value: schema.value('event'),
            change: schema.change('event'),
            filter: filterChange,
            options: EventOptions.filter(event => event.label.includes(filter)),
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
        element(Button, {
          key: 'submit',
          label: 'Create',
          loading: gqlCreateWebhook.loading,
          disabled: !schema.valid,
          click: schema.submit,
        }),
      ],
    }),
  })
}

const SchemaCreateWebhook = yup.object().shape({
  event: yup
    .string()
    .oneOf(WEBHOOKEVENTS)
    .required('Please provide a preset'),
  url: yup.string().required('Please ensure you include a url'),
})

const useCreateWebhook = createUseServer<{
  webhook: {
    id: string
  }
}>({
  query: `
    mutation CreateWebhook($value: CreateWebhookValue!) {
      webhook: CreateWebhook(value: $value) {
        id
      }
    }
  `,
})

const EventOptions = WEBHOOKEVENTS.map(event => ({
  value: event,
  label: event,
}))
