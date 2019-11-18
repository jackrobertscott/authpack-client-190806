import { useContext } from 'react'
import { ThemeContext, ITheme } from '../contexts/Theme'

export const useTheme = (overrides: Partial<ITheme> = {}): ITheme => {
  const theme = useContext(ThemeContext)
  return Object.keys(theme).reduce((all, key) => {
    if (overrides[key]) all[key] = { ...theme[key], ...overrides[key] }
    return all
  }, theme)
}
