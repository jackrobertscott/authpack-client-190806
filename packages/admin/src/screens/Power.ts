import { createElement as create, FC, useEffect } from 'react'
import { Focus, InputBoolean, Layout, Button } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const Power: FC<{
  close: () => void
}> = ({ close }) => {
  const universal = useUniversal()
  const gqlGetApp = useGetApp()
  const gqlUpdateApp = useUpdateApp()
  useEffect(() => {
    gqlGetApp.fetch({ id: universal.app_id })
    // eslint-disable-next-line
  }, [])
  return create(Layout, {
    grow: true,
    children: create(Focus, {
      icon: 'power-off',
      label: 'Power',
      helper: 'Users will only be able to login to your gadgets while on',
      children: create(Layout, {
        divide: true,
        center: true,
        children: [
          create(InputBoolean, {
            key: 'toggle',
            value: universal.power,
            change: power => {
              gqlUpdateApp
                .fetch({ id: universal.app_id, power })
                .then(({ user }) =>
                  UniversalStore.update({ power: user.power })
                )
            },
          }),
          create(Button, {
            key: 'button',
            icon: 'angle-right',
            label: 'Done',
            click: close,
          }),
        ],
      }),
    }),
  })
}

const useGetApp = createUseServer<{
  user: {
    power: boolean
  }
}>({
  query: `
    query wgaGetApp($id: String!) {
      user: wgaGetApp(id: $id) {
        power
      }
    }
  `,
})

const useUpdateApp = createUseServer<{
  user: {
    power: boolean
  }
}>({
  query: `
    mutation wgaUpdateApp($id: String!, $power: Boolean) {
      user: wgaUpdateApp(id: $id, power: $power) {
        power
      }
    }
  `,
})
