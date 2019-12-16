import queryString from 'query-string'
import { createElement as element, FC, useRef } from 'react'
import { Gadgets } from './Gadgets'
import { Oauth } from './Oauth'

export const RouterCentral: FC = () => {
  const query = useRef(queryString.parse(document.location.search))
  if (query.current.code)
    return element(Oauth, {
      code: Array.isArray(query.current.code)
        ? query.current.code[0]
        : query.current.code,
    })
  return element(Gadgets)
}
