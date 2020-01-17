import { createElement as element, FC } from 'react'
import { Layout, Page, Markdown, Button, Code } from '@authpack/theme'

export const WizardOpen: FC<{ next: () => void }> = ({ next }) => {
  return element(Page, {
    title: 'Step 2',
    subtitle: 'Show the Authpack modal',
    children: element(Layout, {
      column: true,
      padding: true,
      divide: true,
      children: [
        element(Markdown, {
          key: 'contents',
          value: `You can make any element on your website a login button. To do this, simply add the data-authpack="open" attribute to the element. Once this attribute has been added, clicking on the element will cause the Authpack plugin to appear. Your users may login through this plugin.
          
Here is an example:`,
        }),
        element(Code, {
          key: 'code',
          value: `
<button data-authpack="open">
  Login
</button>
        `.trim(),
        }),
        element(Markdown, {
          key: 'more',
          value: `Once the user has logged in, you can display their user details, provide them access to certain web pages, and more. Next we will learn how to guard a web page.`,
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
