import {
  createElement as create,
  FC,
  Fragment,
  useState,
  useEffect,
} from 'react'
import { Root, Toaster } from 'wga-theme'
import { UniversalStore } from './utils/universal'
import { Universal } from './contexts/Universal'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { Admin } from './screens/Admin'

export const App: FC = () => {
  const [universal, universalChange] = useState(UniversalStore.current)
  useEffect(() => UniversalStore.listen(universalChange), [])
  return create(ErrorBoundary, {
    children: create(Universal.Provider, {
      value: universal,
      children: create(Root, {
        theme: universal.theme,
        children: create(Fragment, {
          children: [
            create(Admin, {
              key: 'admin',
            }),
            create(Toaster, {
              key: 'toaster',
            }),
          ],
        }),
      }),
    }),
  })
}
