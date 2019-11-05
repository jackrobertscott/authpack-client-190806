import { Store } from 'events-and-things'
import { useMemo } from 'react'

export interface IToasterStore {
  current: Array<{
    id: string
    close: (id: string) => void
    icon?: string
    solid?: boolean
    label: string
    helper: string
  }>
}

export const ToasterStore = new Store<IToasterStore>({
  current: [],
})

export const useToaster = () => {
  const add = (
    toast: { icon?: string; solid?: boolean; label: string; helper: string },
    timer: number = 5000
  ) => {
    const id = Math.random()
      .toString(36)
      .substring(6)
    ToasterStore.change({
      ...ToasterStore.state,
      current: [
        ...ToasterStore.state.current,
        { ...toast, id, close: () => remove(id) },
      ],
    })
    setTimeout(() => remove(id), timer)
  }
  const remove = (id: string) => {
    ToasterStore.change({
      ...ToasterStore.state,
      current: ToasterStore.state.current.filter(i => i.id !== id),
    })
  }
  const factory = () => ({
    add,
    remove,
  })
  return useMemo(factory, [])
}
