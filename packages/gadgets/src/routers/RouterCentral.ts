import { createElement as create, FC, Fragment } from 'react'
import { useRouter } from 'wga-theme'
import { Gadgets } from '../screens/Gadgets'
import { Oauth } from '../screens/Oauth'

export const RouterCentral: FC = () => {
  const router = useRouter({
    nomatch: '/gadgets',
    options: [
      { path: '/gadgets', children: create(Gadgets) },
      { path: '/oauth', children: create(Oauth) },
    ],
  })
  return create(Fragment, {
    children: router.current ? router.current.children : null,
  })
}
