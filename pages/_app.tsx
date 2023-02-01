import 'styles/globals.css'

import { useState } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'

import { ThemeContext } from 'components/Contexts'

config.autoAddCss = false
export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div className={isDarkMode ? 'dark' : ''}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  )
}
