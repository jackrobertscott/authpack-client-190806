import queryString from 'query-string'
import { createElement as create, FC, useRef } from 'react'
import { Gadgets } from '../screens/Gadgets'
import { Oauth } from '../screens/Oauth'

export const RouterCentral: FC = () => {
  const query = useRef(queryString.parse(document.location.search))
  if (query.current.code) {
    return create(Oauth, {
      code: Array.isArray(query.current.code)
        ? query.current.code[0]
        : query.current.code,
    })
  }
  return create(Gadgets)
}
