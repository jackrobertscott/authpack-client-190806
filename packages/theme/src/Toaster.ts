import {
  createElement as create,
  FC,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { css } from 'emotion'
import { Store } from 'events-and-things'
import { Theme } from './Theme'

export interface IToaster {
  Container: FC<{}>
}

export const Toaster: IToaster = {
  Container: () => {
    const theme = useContext(Theme)
    const toaster = useToaster()
    return create('div', {
      children: toaster.current.map(
        ({ id, icon = 'times-circle', label, description, close }) => {
          return create('div', {
            key: id,
            children: [
              create('div', {
                key: 'label',
                children: [
                  create('div', {
                    key: 'icon',
                    onClick: () => close && close(id),
                    className: `fas far fa-${icon} ${css({
                      lineHeight: '1.5em',
                      marginRight: '7.5px',
                      width: '17.5px',
                      cursor: 'pointer',
                      color: theme.toasters.icon,
                    })}`,
                  }),
                  create('div', {
                    key: 'label',
                    children: label,
                    className: css({
                      marginBottom: '3.75px',
                      color: theme.toasters.label,
                    }),
                  }),
                ],
                className: css({
                  display: 'flex',
                }),
              }),
              create('div', {
                key: 'description',
                children: description,
                className: css({
                  marginLeft: '25px',
                  color: theme.toasters.description,
                }),
              }),
            ],
            className: css({
              all: 'unset',
              display: 'flex',
              flexDirection: 'column',
              padding: '15px',
              marginTop: '15px',
              overflow: 'hidden',
              maxWidth: '240px',
              boxShadow: '0 1px 20px -5px hsla(0, 0%, 0%, 0.35)',
              borderRadius: theme.global.radius,
              background: theme.toasters.background,
              color: theme.toasters.description,
            }),
          })
        }
      ),
      className: css({
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 100,
        padding: '25px',
      }),
    })
  },
}

export interface IToasterCurrent {
  icon?: string
  label: string
  description: string
}

export interface IToasterStore {
  current: Array<
    IToasterCurrent & {
      id: string
      close: (id: string) => void
    }
  >
}

export const ToasterStore = new Store<IToasterStore>({
  current: [],
})

export const useToaster = () => {
  const [toaster, changeToaster] = useState<IToasterStore>(ToasterStore.state())
  useEffect(() => ToasterStore.listen(data => changeToaster(data)))
  const add = (next: IToasterCurrent, timer: number = 5000) => {
    const id = Math.random()
      .toString(36)
      .substring(6)
    ToasterStore.change({
      ...toaster,
      current: [
        ...ToasterStore.state().current,
        { ...next, id, close: () => remove(id) },
      ],
    })
    setTimeout(() => remove(id), timer)
  }
  const remove = (id: string) => {
    ToasterStore.change({
      ...toaster,
      current: ToasterStore.state().current.filter(i => i.id !== id),
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
