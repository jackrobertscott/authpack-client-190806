import { useEffect, useRef } from 'react'
import { useAuthpack } from '../utils/authpack'
import { createUseServer } from './useServer'
import { UniversalStore } from '../utils/universal'
import { useUniversal } from './useUniversal'

export const useSetup = () => {
  const authpack = useAuthpack()
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  const ids = useRef<{ cluster?: string; team?: string }>({})
  useEffect(() => {
    if (authpack.team && authpack.team.id) {
      // when the team changes, we want to ignore the currently saved cluster id
      let nextClusterId = universal.cluster_id
      if (authpack.team.id !== ids.current.team) {
        nextClusterId = undefined
        UniversalStore.recreate({
          ready: true,
        })
      }
      gqlGetCluster
        .fetch({ id: nextClusterId })
        .then(({ cluster }) => {
          ids.current = {
            cluster: cluster.id,
            team: authpack.team && authpack.team.id,
          }
          UniversalStore.recreate({
            ready: true,
            cluster_id: cluster.id,
            cluster_name: cluster.name,
            cluster_key_client: cluster.key_client,
          })
        })
        .catch(() => {
          UniversalStore.recreate({
            ready: true,
          })
        })
    } else {
      setTimeout(() => {
        UniversalStore.recreate({
          ready: true,
        })
      })
    }
    // eslint-disable-next-line
  }, [universal.cluster_id, authpack.team && authpack.team.id])
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    key_client: string
    name: string
    theme_preference: string
  }
}>({
  query: `
    query GetClusterClient($id: String) {
      cluster: GetClusterClient(id: $id) {
        id
        key_client
        name
        theme_preference
      }
    }
  `,
})
