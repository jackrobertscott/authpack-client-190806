import { createElement as element, FC } from 'react'
import { Layout, Page, Markdown, Code, Button } from '@authpack/theme'

export const WizardGuard: FC<{ next: () => void; more: () => void }> = ({
  next,
  more,
}) => {
  return element(Page, {
    title: 'Step 3',
    subtitle: 'Protect a page on your website',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Markdown, {
          key: 'contents',
          value: `By default, a route guard will prevent any unauthenticated users from accessing your web page. To add the route guard, you will need to add the following code into the \`<head></head>\` section of the page you wish to protect.`,
        }),
        element(Code, {
          key: 'code',
          value: `
<meta
  data-authpack="guard"
  data-redirect="/home.html"
/>
        `.trim(),
        }),
        element(Markdown, {
          key: 'more',
          value: `Once the user has logged in, you can display their user details, provide them access to certain web pages, and more. Next we will learn how to guard a web page.`,
        }),
        element(Layout, {
          key: 'buttons',
          divide: true,
          children: [
            element(Button, {
              key: 'close',
              icon: 'times-circle',
              label: 'Close',
              click: next,
            }),
            element(Button, {
              key: 'next',
              icon: 'external-link-alt',
              label: 'Learn More',
              click: more,
            }),
          ],
        }),
      ],
    }),
  })
}
