import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import '@algolia/autocomplete-theme-classic'

import { siteConfigs } from 'configs/config'
import { ThemeContext } from 'components/Contexts'

const useThemeContext = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error('themeContext is null!')
  }

  return themeContext
}

export default function Header() {
  const router = useRouter()
  const { isDarkMode, setIsDarkMode } = useThemeContext()

  return (
    <div className="bg-gray-50 w-full dark:bg-stone-800">
      <div className="flex inset-x-0 container mx-auto justify-between z-10">
        <div className="flex px-2 py-4 space-x-6">
          <div className="text-gray-900 dark:text-gray-50 text-3xl font-bold">
            {siteConfigs.title}
          </div>
        </div>
        <div className="flex px-2 py-2 space-x-6 items-center text-gray-800 dark:text-gray-100">
          {siteConfigs.nav.map(({ name, href }, index) => (
            <Link
              key={index}
              className={`font-bold hover:text-sora ${
                router.asPath === href ? 'text-sora' : null
              } `}
              href={href}
            >
              {name}
            </Link>
          ))}
          <div className="before:content-[''] before:mr-5 before:text-gray-500 before:border-r">
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="cursor-pointer"
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
