import { createBrowserHistory, createMemoryHistory, History } from 'history'

export const history: History =
  typeof document !== 'undefined'
    ? createBrowserHistory()
    : createMemoryHistory()
