import { createElement as element, FC, useEffect } from 'react'
import { Layout, Snippet, Page } from '@authpack/theme'
import { format } from 'date-fns'
import { createUseServer } from '../hooks/useServer'

export const ShowWebhook: FC<{
  id: string
}> = ({ id }) => {
  const gqlGetWebhook = useGetWebhook()
  useEffect(() => {
    gqlGetWebhook.fetch({ id })
    // eslint-disable-next-line
  }, [id])
  const webhook = gqlGetWebhook.data ? gqlGetWebhook.data.webhook : undefined
  return element(Page, {
    title: 'Inspect',
    subtitle: 'Webhook',
    children: !webhook
      ? null
      : element(Layout, {
          column: true,
          children: [
            element(Snippet, {
              key: 'id',
              icon: 'fingerprint',
              label: 'Id',
              value: webhook.id,
            }),
            element(Snippet, {
              key: 'event',
              icon: 'hashtag',
              label: 'Event',
              value: webhook.event,
            }),
            element(Snippet, {
              key: 'url',
              icon: 'wifi',
              label: 'Url',
              value: webhook.url,
            }),
            element(Snippet, {
              key: 'created',
              icon: 'clock',
              label: 'Created',
              value:
                webhook.created &&
                format(new Date(webhook.created), 'dd LLL yyyy @ h:mm a'),
            }),
            element(Snippet, {
              key: 'updated',
              icon: 'clock',
              label: 'Updated',
              value:
                webhook.updated &&
                format(new Date(webhook.updated), 'dd LLL yyyy @ h:mm a'),
            }),
          ],
        }),
  })
}

const useGetWebhook = createUseServer<{
  webhook: {
    id: string
    created: string
    updated: string
    event: string
    url: string
  }
}>({
  query: `
    query GetWebhook($id: String!) {
      webhook: GetWebhook(id: $id) {
        id
        created
        updated
        event
        url
      }
    }
  `,
})
