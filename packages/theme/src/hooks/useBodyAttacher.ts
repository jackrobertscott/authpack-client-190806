import { useEffect, useState, useMemo } from 'react'

export const useBodyAttacher = ({ id, tag }: { id: string; tag: string }) => {
  const [element, elementChange] = useState<HTMLElement | undefined>()
  useEffect(() => {
    let attached: HTMLElement
    const connect = () => {
      const parent = id ? document.getElementById(id) : document.body
      if (parent) {
        attached = document.createElement(tag)
        parent.appendChild(attached)
        elementChange(attached)
      } else setTimeout(connect, 3000)
    }
    return () => {
      elementChange(undefined)
      if (attached) attached.remove()
    }
  }, [id])
  return useMemo(() => {
    return { element }
  }, [element])
}
