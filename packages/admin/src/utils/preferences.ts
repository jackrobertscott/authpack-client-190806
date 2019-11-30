import {
  createElement as create,
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from 'react'

export interface IPreferences {
  theme: 'night_sky' | 'snow_storm' | 'blue_harvester'
}

export type IPreferencesContext = IPreferences & {
  update: (value: Partial<IPreferences>) => void
}

export const PreferencesContext = createContext<IPreferencesContext>({
  theme: 'snow_storm',
  update: () => console.warn('Preferences not setup'),
})

export const Preferences: FC<{ children: ReactNode }> = ({ children }) => {
  const local = 'wga.preferences'
  let initial: IPreferences = {
    theme: 'snow_storm',
  }
  try {
    const data = localStorage.getItem(local)
    if (data) initial = JSON.parse(data)
  } catch {
    localStorage.removeItem(local)
  }
  const [state, stateChange] = useState<IPreferences>(initial)
  useEffect(() => {
    try {
      const data = JSON.stringify(state)
      localStorage.setItem(local, data)
    } catch {
      localStorage.removeItem(local)
    }
  }, [state])
  const value = useMemo(() => {
    return {
      ...state,
      update: (data: Partial<IPreferences>) =>
        stateChange({ ...state, ...data }),
    }
  }, [state])
  return create(PreferencesContext.Provider, {
    value,
    children,
  })
}

export const usePreferences = () => {
  return useContext(PreferencesContext)
}
