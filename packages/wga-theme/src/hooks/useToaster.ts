import { Store } from 'events-and-things'
import { useStore } from './useStore'

type ToasterArray = Array<{
  id: string
  close: (id: string) => void
  icon?: string
  solid?: boolean
  label: string
  helper: string
}>

class ToasterArrayStore extends Store<ToasterArray> {
  public add(
    toast: {
      icon?: string
      solid?: boolean
      label: string
      helper: string
    },
    timer: number = 5000
  ) {
    const id = Math.random()
      .toString(36)
      .substring(6)
    ToasterStore.change([
      ...this.current,
      { ...toast, id, close: () => this.remove(id) },
    ])
    setTimeout(() => this.remove(id), timer)
  }
  public remove(id: string) {
    ToasterStore.change(this.current.filter((i: any) => i.id !== id))
  }
}

export const ToasterStore = new ToasterArrayStore([])

export const useToaster = () => {
  return useStore({
    store: ToasterStore,
  })
}
