import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal: FC<{
  id?: string
  children: ReactNode
}> = ({ id = 'portals', children }) => {
  const [element, elementChange] = useState(document.getElementById(id))
  useEffect(() => {
    if (!element) {
      const createdElement = document.createElement('div')
      createdElement.id = id
      document.body.appendChild(createdElement)
      elementChange(createdElement)
    }
  }, [])
  return element ? createPortal(children, element) : null
}
