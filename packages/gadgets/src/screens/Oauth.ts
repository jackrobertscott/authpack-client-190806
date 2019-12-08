import { createElement as create, FC, useEffect } from 'react'
import { Loading } from './Loading'
import { Root, Toaster } from '@authpack/theme'

export const Oauth: FC<{
  code: string
}> = ({ code }) => {
  useEffect(() => {
    const data = JSON.stringify({ code, created: Date.now() })
    localStorage.setItem('authpack.code', data)
    setTimeout(() => localStorage.removeItem('authpack.code'), 60 * 1000)
  }, [code])
  return create(Root, {
    children: create(Toaster, {
      children: create(Loading, {
        key: 'Window will close automatically',
      }),
    }),
  })
}
