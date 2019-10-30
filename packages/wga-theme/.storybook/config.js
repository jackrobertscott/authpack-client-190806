import { configure } from '@storybook/react'

// automatically import all files ending in *.tsx
const req = require.context('../stories', true, /\.(ts|tsx)$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
