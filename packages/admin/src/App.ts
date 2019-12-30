import queryString from 'query-string'
import { createElement as element, FC, useRef } from 'react'
import { Toaster, Oauth } from '@authpack/theme'
import { ErrorBoundary } from './screens/ErrorBoundary'
import { Core } from './screens/Core'

export const App: FC = () => {
  const query = useRef(queryString.parse(document.location.search))
  return element(ErrorBoundary, {
    children: element(Toaster, {
      children: query.current.code
        ? element(Oauth, {
            code: Array.isArray(query.current.code)
              ? query.current.code[0]
              : query.current.code,
          })
        : element(Core),
    }),
  })
}
