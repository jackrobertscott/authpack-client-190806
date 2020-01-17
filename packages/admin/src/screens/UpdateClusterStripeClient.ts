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
  Snippet,
} from '@authpack/theme'
import { useUniversal } from '../hooks/useUniversal'
import { createUseServer } from '../hooks/useServer'

export const UpdateClusterStripeClient: FC<{
  change?: (id?: string) => void
  chooseProduct?: (id: string, name?: string) => void
}> = ({ change, chooseProduct }) => {
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
    title: 'Payments',
    subtitle: 'Charge your users money',
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
          gqlGetCluster.data.cluster.stripe_pending
            ? element(Poster, {
                key: 'poster',
                icon: 'pause-circle',
                label: 'Pending',
                helper: 'More verification documents required',
              })
            : gqlGetCluster.data.cluster.stripe_dashboard_url
            ? element(Poster, {
                key: 'poster',
                icon: 'piggy-bank',
                label: 'Connected',
                helper: 'Account ready to accept payments',
              })
            : element(Poster, {
                key: 'poster',
                icon: 'piggy-bank',
                label: 'Payments',
                helper:
                  'You will be able to see and create payment plans once a Stripe account is connected',
              }),
          gqlGetCluster.data.cluster.stripe_user_product_id &&
            element(Snippet, {
              key: 'user_product',
              label: 'User Plans',
              click: () =>
                gqlGetCluster.data &&
                gqlGetCluster.data.cluster.stripe_user_product_id &&
                chooseProduct &&
                chooseProduct(
                  gqlGetCluster.data.cluster.stripe_user_product_id,
                  'User'
                ),
            }),
          gqlGetCluster.data.cluster.stripe_team_product_id &&
            element(Snippet, {
              key: 'team_product',
              label: 'Team Plans',
              click: () =>
                gqlGetCluster.data &&
                gqlGetCluster.data.cluster.stripe_team_product_id &&
                chooseProduct &&
                chooseProduct(
                  gqlGetCluster.data.cluster.stripe_team_product_id,
                  'Team'
                ),
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
                    label: 'Dashboard',
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
                        gqlGetCluster.data.cluster.stripe_oauth_url
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
    stripe_oauth_url: string
    stripe_dashboard_url: string
    stripe_pending: boolean
    stripe_user_product_id?: string
    stripe_team_product_id?: string
  }
}>({
  query: `
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        id
        stripe_oauth_url
        stripe_dashboard_url
        stripe_pending
        stripe_user_product_id
        stripe_team_product_id
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
