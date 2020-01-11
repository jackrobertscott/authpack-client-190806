import { createElement as element, FC, useEffect } from 'react'
import { useLocalRouter, IconBar } from '@authpack/theme'
import { useSettings } from '../hooks/useSettings'
import { RouterSideBarUser } from './RouterSideBarUser'
import { RouterSideBarTeam } from './RouterSideBarTeam'
import { LogoutUser } from './LogoutUser'
import { ReconcileUser } from './ReconcileUser'
import { CreateSubscription } from './CreateSubscription'
import { SettingsStore } from '../utils/settings'

export const RouterModalLoggedIn: FC<{
  close: () => void
}> = ({ close }) => {
  const settings = useSettings()
  const nomatch =
    !settings.user || !settings.user.verified
      ? '/verify'
      : settings.cluster &&
        settings.cluster.enable_team &&
        settings.cluster.prompt_team &&
        !settings.team
      ? '/teams'
      : '/users'
  const router = useLocalRouter({
    name: nomatch === '/users' ? 'onauthed' : undefined,
    nomatch,
    options: !settings.user
      ? []
      : [
          {
            key: '/users',
            children: element(RouterSideBarUser),
          },
          {
            key: '/teams',
            children: element(RouterSideBarTeam),
          },
          {
            key: '/subscription',
            nosave: true,
            children: !settings.options.prompt_plan
              ? null
              : element(CreateSubscription, {
                  stripe_plan_id: settings.options.prompt_plan,
                  change: () => {
                    router.change('/user')
                    if (SettingsStore.current.options.prompt_plan) {
                      SettingsStore.update({
                        options: {
                          ...SettingsStore.current.options,
                          prompt_plan: undefined,
                        },
                      })
                    }
                  },
                }),
          },
          {
            key: '/logout',
            nosave: true,
            children: element(LogoutUser),
          },
          {
            key: '/verify',
            nosave: true,
            children: element(ReconcileUser, {
              email: settings.user.email,
            }),
          },
        ],
  })
  useEffect(() => {
    const matching = router.current.key === '/subscription'
    if (matching && !settings.options.prompt_plan) {
      router.change('/user')
    }
    if (!matching && settings.options.prompt_plan) {
      router.change('/subscription')
    }
    // eslint-disable-next-line
  }, [settings.options.prompt_plan])
  const navigate = (go: string) => {
    router.change(go)
    if (SettingsStore.current.options.prompt_plan) {
      SettingsStore.update({
        options: {
          ...SettingsStore.current.options,
          prompt_plan: undefined,
        },
      })
    }
  }
  if (!settings.bearer || !settings.user) return null
  return element(IconBar, {
    children: router.current && router.current.children,
    icons: [
      {
        icon: 'user-circle',
        label: 'User',
        focused: router.current && router.current.key.startsWith('/users'),
        click: () => navigate('/users'),
      },
      !!settings.cluster &&
        !!settings.cluster.enable_team && {
          icon: 'users',
          label: 'Team',
          focused: router.current && router.current.key.startsWith('/teams'),
          click: () => navigate('/teams'),
        },
      {
        icon: 'power-off',
        label: 'Logout',
        focused: router.current && router.current.key === '/logout',
        click: () => navigate('/logout'),
      },
      !settings.user.verified && {
        icon: 'exclamation-circle',
        label: 'Verify Email',
        focused: router.current && router.current.key === '/verify',
        click: () => navigate('/verify'),
        seperated: true,
      },
      {
        icon: 'times-circle',
        label: 'Close',
        click: close,
        prefix: 'far',
        seperated: !!settings.user.verified,
      },
    ],
  })
}
