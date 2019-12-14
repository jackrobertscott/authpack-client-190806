import { createElement as element, FC, useEffect } from 'react'
import { Root } from '@authpack/theme'
import { Loading } from './Loading'

export const Oauth: FC<{
  code: string
}> = ({ code }) => {
  useEffect(() => {
    const data = JSON.stringify({ code, created: Date.now() })
    localStorage.setItem('authpack.code', data)
    setTimeout(() => localStorage.removeItem('authpack.code'), 60 * 1000)
  }, [code])
  return element(Root, {
    children: element(Loading, {
      key: 'Window will close automatically',
    }),
  })
}
