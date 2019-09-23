import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { format } from 'date-fns'
import { createUseGraph } from '../../hooks/useGraph'

export type IListMembershipsOfGroup = {
  id: string
  change?: () => void
}

export const ListMembershipsOfGroup: FC<IListMembershipsOfGroup> = ({ id }) => {
  // load the membership to show on page
  const retrieveMembershipGraph = useRetrieveMembership({
    options: { id },
  })
  console.log(retrieveMembershipGraph.data)
  return create(Gadgets.Container, {
    label: 'Memberships of Group',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children: retrieveMembershipGraph.data && [
        create(Overview.Container, {
          key: 'Id',
          label: 'Id',
          icon: 'fingerprint',
          value: retrieveMembershipGraph.data.group.id,
        }),
      ],
    }),
  })
}

const useRetrieveMembership = createUseGraph<{
  group: {
    id: string
    memberships: {
      id: string
      created: string
      updated: string
    }
  }
}>({
  api: true,
  query: `
    query ListMembershipsOfGroup($options: RetrieveGroupOptions!) {
      group: RetrieveGroup(options: $options) {
        id
        memberships {
          id
          created
          updated
        }
      }
    }
  `,
})
