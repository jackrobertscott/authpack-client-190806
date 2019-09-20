import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../../hooks/useGraph'

export type IRetrieveSession = {
  id: string
  change?: () => void
}

export const RetrieveSession: FC<IRetrieveSession> = ({ id }) => {
  // load the session to show on page
  const retrieveSessionGraph = useRetrieveSession({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview Session',
    brand: 'Your App',
    children: create(Gadgets.Spacer, {
      children: retrieveSessionGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveSessionGraph.data.session.id,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrieveSessionGraph.data.session.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrieveSessionGraph.data.session.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}

const useRetrieveSession = createUseGraph<{
  session: {
    id: string
    created: string
    updated: string
  }
}>({
  api: true,
  query: `
    query RetrieveSession($options: RetrieveSessionOptions!) {
      session: RetrieveSession(options: $options) {
        id
        updated
        created
      }
    }
  `,
})
