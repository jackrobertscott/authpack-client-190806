import { createElement as element, FC } from 'react'
import { Gadgets } from './Gadgets'
import { Settings } from '../utils/settings'

export const Core: FC = () => {
  return element(Settings, {
    children: element(Gadgets),
  })
}
