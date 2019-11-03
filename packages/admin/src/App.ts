import '@fortawesome/fontawesome-free/css/all.min.css'
import { createElement as create, FC, useEffect } from 'react'
import { css } from 'emotion'
import { Theme, BlueHarvester, Layout } from 'wga-theme'
import { RouterCentral } from './routers/RouterCentral'
import { useGadgetsState } from './hooks/useGadgets'
import { gadgets } from './utils/wga'

export const App: FC<{}> = () => {
  const { state, loading } = useGadgetsState()
  useEffect(() => {
    if (!loading && !state) {
      gadgets.open()
    }
  }, [state, loading])
  return create(Theme.Provider, {
    value: BlueHarvester,
    children: create(RouterCentral),
  })
}
