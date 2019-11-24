import { createElement as create, FC, useEffect } from 'react'
import { Snippet, Page } from 'wga-theme'
import { format, differenceInMinutes } from 'date-fns'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListSessions: FC = () => {
  const settings = useSettings()
  const gqlListSessions = useListSessions()
  useEffect(() => {
    gqlListSessions.fetch()
    // eslint-disable-next-line
  }, [])
  return create(Page, {
    title: 'Sessions',
    subtitle: settings.cluster && settings.cluster.name,
    children: !gqlListSessions.data
      ? null
      : gqlListSessions.data.sessions.map(({ id, created, ended, team }) => {
          const difference =
            ended &&
            differenceInMinutes(new Date(ended), new Date(created))
              .toString()
              .concat(' mins')
          const creation = format(new Date(created), 'dd LLL yyyy @ h:mm a')
          return create(Snippet, {
            key: id,
            icon: 'history',
            label: difference ? `${creation} - ${difference}` : creation,
            value: team && team.name,
          })
        }),
  })
}

const useListSessions = createUseServer<{
  sessions: Array<{
    id: string
    created: string
    ended?: string
    team?: {
      name: string
    }
  }>
}>({
  query: `
    query ListSessionsClient {
      sessions: ListSessionsClient {
        id
        created
        ended
        team {
          name
        }
      }
    }
  `,
})
