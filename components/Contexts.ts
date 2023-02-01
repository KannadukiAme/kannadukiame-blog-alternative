import { createContext, Dispatch, SetStateAction } from 'react'

type ThemeContextType = {
  isDarkMode: boolean
  setIsDarkMode: Dispatch<SetStateAction<boolean>>
}

export const ThemeContext = createContext<ThemeContextType | null>(null)
