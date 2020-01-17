import { createElement as element, FC, useEffect } from 'react'
import { Layout, Page, Markdown, Code, Button } from '@authpack/theme'
import { createUseServer } from '../hooks/useServer'
import { useUniversal } from '../hooks/useUniversal'

export const WizardScripts: FC<{ next: () => void }> = ({ next }) => {
  const universal = useUniversal()
  const gqlGetCluster = useGetCluster()
  useEffect(() => {
    gqlGetCluster.fetch({ id: universal.cluster_id })
    // eslint-disable-next-line
  }, [universal.cluster_id])
  return element(Page, {
    title: 'Step 1',
    subtitle: 'Add the script tags to your website',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Markdown, {
          key: 'head',
          value: `Please add the following code inside the \`<head></head>\` tags of your website pages.`,
        }),
        gqlGetCluster.data &&
          element(Code, {
            key: 'code',
            value: `
<script
  src="https://scripts.v1.authpack.io/index.js"
  data-key="${gqlGetCluster.data.cluster.key_client}">
</script>
          `.trim(),
          }),
        element(Markdown, {
          key: 'contents',
          value: `This code will load Authpack onto your website. Next we will learn how to open the Authpack modal.`,
        }),
        element(Button, {
          key: 'next',
          icon: 'angle-double-right',
          label: 'Next',
          click: next,
        }),
      ],
    }),
  })
}

const useGetCluster = createUseServer<{
  cluster: {
    key_client: string
  }
}>({
  query: `
    query GetClusterClient($id: String!) {
      cluster: GetClusterClient(id: $id) {
        key_client
      }
    }
  `,
})
