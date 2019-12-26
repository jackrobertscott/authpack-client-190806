import { createElement as element, FC, useEffect } from 'react'
import {
  Layout,
  Page,
  Button,
  useOauthCode,
  Focus,
  Poster,
  useMounted,
  useToaster,
} from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdateClusterStripe: FC<{
  change?: (id?: string) => void
}> = ({ change }) => {
  const toaster = useToaster()
  const mounted = useMounted()
  const oauthCode = useOauthCode()
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  const gqlUpsertClusterStripe = useUpsertClusterStripe()
  useEffect(() => {
    gqlGetCluster.fetch({ id: universal.cluster_id })
    // eslint-disable-next-line
  }, [universal.cluster_id])
  useEffect(() => {
    if (oauthCode.current && oauthCode.code) {
      gqlUpsertClusterStripe
        .fetch({
          id: oauthCode.current,
          code: oauthCode.code,
        })
        .then(({ cluster }) => {
          if (change) change(cluster.id)
          gqlGetCluster.fetch({ id: universal.cluster_id })
          toaster.add({
            icon: 'check-circle',
            label: 'Success',
            helper: 'You can now accept payments',
          })
        })
        .finally(() => {
          if (!mounted.current) return
          oauthCode.clear()
        })
    }
    // eslint-disable-next-line
  }, [oauthCode.current, oauthCode.code])
  return element(Page, {
    title: 'Accept Payments',
    subtitle: 'Cluster',
    children: oauthCode.current
      ? element(Focus, {
          icon: 'sync-alt',
          label: 'Pending',
          helper: 'Waiting for user to connect to Stripe',
          children: element(Button, {
            icon: 'times-circle',
            label: 'Cancel',
            click: () => oauthCode.clear(),
          }),
        })
      : !gqlGetCluster.data
      ? null
      : [
          element(Poster, {
            key: 'poster',
            icon: 'piggy-bank',
            label: 'Payments',
            helper: 'Start accepting payments',
          }),
          element(Layout, {
            key: 'layout',
            column: true,
            padding: true,
            divide: true,
            children: [
              gqlGetCluster.data.cluster.stripe_dashboard_url
                ? element(Button, {
                    key: 'dashboard',
                    icon: 'external-link-alt',
                    label: 'Manage',
                    loading: gqlUpsertClusterStripe.loading,
                    click: () =>
                      gqlGetCluster.data &&
                      window.open(
                        gqlGetCluster.data.cluster.stripe_dashboard_url
                      ),
                  })
                : element(Button, {
                    key: 'submit',
                    icon: 'external-link-alt',
                    label: 'Setup',
                    loading: gqlUpsertClusterStripe.loading,
                    click: () =>
                      gqlGetCluster.data &&
                      oauthCode.open(
                        gqlGetCluster.data.cluster.id,
                        gqlGetCluster.data.cluster.stripe_express_url
                      ),
                  }),
            ],
          }),
        ],
  })
}

const useGetCluster = createUseServer<{
  cluster: {
    id: string
    stripe_express_url: string
    stripe_dashboard_url: string
  }
}>({
  query: `
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        id
        stripe_express_url
        stripe_dashboard_url
      }
    }
  `,
})

const useUpsertClusterStripe = createUseServer<{
  cluster: {
    id: string
  }
}>({
  query: `
    mutation UpsertClusterStripeClient($id: String!, $code: String!) {
      cluster: UpsertClusterStripeClient(id: $id, code: $code) {
        id
      }
    }
  `,
})
