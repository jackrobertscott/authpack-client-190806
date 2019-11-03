import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useApp } from '../hooks/useApp'

export const CreateSubscription: FC = () => {
  const app = useApp()
  return create(Gadgets, {
    title: 'Subscription',
    subtitle: app.state && app.state.appname,
    children: null,
  })
}
