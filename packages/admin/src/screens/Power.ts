import { createElement as create, FC } from 'react'
import { Focus, InputBoolean, Layout, Button } from 'wga-theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'
import { UniversalStore } from '../utils/universal'

export const Power: FC<{
  close: () => void
}> = ({ close }) => {
  const universal = useUniversal()
  const gqlUpdateApp = useUpdateApp()
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
                .fetch({ id: universal.app_id, input: { power } })
                .then(({ app }) => {
                  UniversalStore.update({ power: app.power })
                })
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

const useUpdateApp = createUseServer<{
  app: {
    power: boolean
  }
}>({
  query: `
    mutation wgaUpdateApp($id: String!, $input: UpdateAppInput!) {
      app: wgaUpdateApp(id: $id, input: $input) {
        power
      }
    }
  `,
})
