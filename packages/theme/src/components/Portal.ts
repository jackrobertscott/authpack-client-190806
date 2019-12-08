import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal: FC<{
  id?: string
  children: ReactNode
}> = ({ id = 'portals', children }) => {
  const [element, elementChange] = useState(document.getElementById(id))
  useEffect(() => {
    if (!element)
      setTimeout(() => {
        const dom = document.getElementById(id)
        if (!dom) throw new Error('Could not find portal dom element')
        elementChange(dom)
      })
  }, [])
  return element ? createPortal(children, element) : null
}
