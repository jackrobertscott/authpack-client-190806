import { createElement as create, Component, ReactNode } from 'react'
import { Focus, Button } from '@authpack/theme'
import * as Sentry from '@sentry/browser'

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { error: undefined }
  }
  public componentDidCatch(error: any, info: any) {
    Sentry.withScope(scope => {
      Object.keys(info).forEach(key => scope.setExtra(key, info[key]))
      Sentry.captureException(error)
    })
    this.setState({ error })
  }
  public render() {
    const { error } = this.state
    const { children } = this.props
    if (error) {
      return create(Focus, {
        icon: 'bug',
        label: 'Error',
        helper: error.message || 'There was a bug in our code...',
        children: create(Button, {
          icon: 'redo-alt',
          label: 'Reload App',
          click: () => document.location.reload(),
        }),
      })
    }
    return children
  }
}
