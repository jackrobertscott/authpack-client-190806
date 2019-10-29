import { createElement as create, FC } from 'react'
import { useTheme } from '../contexts/Theme'

export const Page: FC<{}> = ({}) => {
  const theme = useTheme()
  return create('div')
}
