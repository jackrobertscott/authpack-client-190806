import { useAuthpack } from '@authpack/react'
import { useEffect } from 'react'

declare global {
  interface Window {
    FS: any
  }
}

export const useFullStory = () => {
  const auth = useAuthpack()
  useEffect(() => {
    if (!window.FS || !auth.user) return
    // https://help.fullstory.com/hc/en-us/articles/360020623294
    window.FS.identify(auth.user.id, {
      displayName: auth.user.name,
      email: auth.user.email,
      firstName_str: auth.user.name_given,
      lastName_str: auth.user.name_family,
      username_str: auth.user.username,
      created_date: auth.user.created,
      updated_date: auth.user.updated,
    })
    // eslint-disable-next-line
  }, [auth.user && auth.user.id])
}
