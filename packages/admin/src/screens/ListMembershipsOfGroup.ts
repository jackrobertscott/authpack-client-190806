import { createElement as create, FC } from 'react'
import { Gadgets, Overview } from 'wga-theme'
import { createUseGraph } from '../hooks/useGraph'

export type IListMembershipsOfGroup = {
  id: string
  change?: () => void
}

export const ListMembershipsOfGroup: FC<IListMembershipsOfGroup> = ({ id }) => {
  // load the membership to show on page
  const retrieveMembership = useRetrieveMembership({
    options: { id },
  })
  return create(Gadgets.Container, {
    label: 'Memberships of Group',
    brand: 'Authenticator',
    children: create(Gadgets.Spacer, {
      children:
        retrieveMembership.data &&
        retrieveMembership.data.group.memberships.map(membership => {
          return create(Overview.Container, {
            key: 'Id',
            label: 'Id',
            icon: 'fingerprint',
            value: membership.id,
          })
        }),
    }),
  })
}

const useRetrieveMembership = createUseGraph<{
  group: {
    id: string
    memberships: Array<{
      id: string
      created: string
      updated: string
    }>
  }
}>({
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
