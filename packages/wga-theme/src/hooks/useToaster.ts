import { Store } from 'events-and-things'
import { useState, useEffect, useMemo } from 'react'

export interface IToaster {
  icon?: string
  solid?: boolean
  label: string
  helper: string
}

export interface IToasterStore {
  current: Array<
    IToaster & {
      id: string
      close: (id: string) => void
    }
  >
}

export const ToasterStore = new Store<IToasterStore>({
  current: [],
})

export const useToaster = () => {
  const [toaster, changeToaster] = useState<IToasterStore>(ToasterStore.state)
  useEffect(() => ToasterStore.listen(data => changeToaster(data)))
  const add = (next: IToaster, timer: number = 5000) => {
    const id = Math.random()
      .toString(36)
      .substring(6)
    ToasterStore.change({
      ...toaster,
      current: [
        ...ToasterStore.state.current,
        { ...next, id, close: () => remove(id) },
      ],
    })
    setTimeout(() => remove(id), timer)
  }
  const remove = (id: string) => {
    ToasterStore.change({
      ...toaster,
      current: ToasterStore.state.current.filter(i => i.id !== id),
    })
  }
  return useMemo(
    () => ({
      ...toaster,
      add,
      remove,
    }),
    [toaster]
  )
}
