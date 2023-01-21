import 'styles/globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { ThemeContext } from 'components/Contexts'
import { useState } from 'react'

config.autoAddCss = false
export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(false)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme ? 'dark' : null}>
        <Component {...pageProps} />
      </div>
    </ThemeContext.Provider>
  )
}
