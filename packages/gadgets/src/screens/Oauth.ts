import { createElement as create, FC, useEffect } from 'react'
import { Loading } from './Loading'

export const Oauth: FC<{
  code: string
}> = ({ code }) => {
  useEffect(() => {
    const data = JSON.stringify({ code, created: Date.now() })
    localStorage.setItem('wga.code', data)
  }, [code])
  return create(Loading, {
    key: 'Window will close automatically',
  })
}
