import { useEffect } from 'react'
import { useGadgets } from './useGadgets'
import { createUseServer } from './useServer'
import { UniversalStore } from '../utils/universal'
import { useUniversal } from './useUniversal'

export const useSetup = () => {
  const gadgets = useGadgets()
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    UniversalStore.recreate({
      cluster_id: gadgets.bearer && universal.cluster_id,
    })
    if (gadgets.bearer && gadgets.team && gadgets.team.id) {
      gqlGetCluster
        .fetch({ id: universal.cluster_id })
        .then(({ cluster }) => {
          UniversalStore.update({
            ready: true,
            cluster_id: cluster.id,
            cluster_name: cluster.name,
            cluster_key_client: cluster.key_client,
            power: cluster.power,
            subscribed: cluster.subscribed,
            theme: cluster.theme,
          })
        })
        .catch(() => UniversalStore.update({ ready: true }))
    } else {
      setTimeout(() => UniversalStore.update({ ready: true }))
    }
    // eslint-disable-next-line
  }, [universal.cluster_id, gadgets.bearer, gadgets.team && gadgets.team.id])
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    key_client: string
    name: string
    theme: string
    power: boolean
    subscribed: boolean
  }
}>({
  query: `
    query GetClusterClient($id: String) {
      cluster: GetClusterClient(id: $id) {
        id
        key_client
        name
        theme
        power
        subscribed
      }
    }
  `,
})
