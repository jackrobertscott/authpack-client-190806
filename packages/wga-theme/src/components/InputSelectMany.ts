import { createElement as create, FC } from 'react'
import { css } from 'emotion'
import { useTheme } from '../contexts/Theme'

export const InputSelectMany: FC<{
  value?: string
  change?: (value: string) => void
}> = ({ value, change }) => {
  const theme = useTheme()
  return create('div', {
    className: css({
      // todo...
    }),
  })
}
