import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../hooks/useGraph'

export type IRetrieveMembership = {
  id: string
  change?: () => void
}

export const RetrieveMembership: FC<IRetrieveMembership> = ({ id }) => {
  // load the membership to show on page
  const retrieveMembershipGraph = useRetrieveMembership({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Overview Membership',
    brand: 'Authenticator',
    children: create(Overview.Spacer, {
      children: retrieveMembershipGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveMembershipGraph.data.membership.id,
        }),
        create(Overview.Container, {
          key: 'Created',
          label: 'Created',
          icon: 'clock',
          value: format(
            new Date(retrieveMembershipGraph.data.membership.created),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
        create(Overview.Container, {
          key: 'Updated',
          label: 'Updated',
          icon: 'clock',
          value: format(
            new Date(retrieveMembershipGraph.data.membership.updated),
            "dd LLL yyyy 'at' hh:mm aaaa"
          ),
        }),
      ],
    }),
  })
}

const useRetrieveMembership = createUseGraph<{
  membership: {
    id: string
    created: string
    updated: string
  }
}>({
  query: `
    query RetrieveMembership($options: RetrieveMembershipOptions!) {
      membership: RetrieveMembership(options: $options) {
        id
        updated
        created
      }
    }
  `,
})
