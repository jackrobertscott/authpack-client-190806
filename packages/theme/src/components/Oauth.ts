import { createElement as element, FC, useEffect } from 'react'
import { Root } from './Root'
import { Focus } from './Focus'

export const Oauth: FC<{
  code: string
}> = ({ code }) => {
  useEffect(() => {
    const data = JSON.stringify({
      message: 'authpack.code',
      payload: { code, created: Date.now() },
    })
    localStorage.setItem('authpack.code', data)
    window.postMessage(data, window.origin)
    setTimeout(() => localStorage.removeItem('authpack.code'), 60 * 1000)
  }, [code])
  return element(Root, {
    children: element(Focus, {
      icon: 'sync-alt',
      label: 'Loading',
      helper: 'Window will close automatically',
    }),
  })
}
