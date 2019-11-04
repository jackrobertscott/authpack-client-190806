import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'

export const SignupUser: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Signup',
    subtitle: settings.state.appname,
    children: null,
  })
}
