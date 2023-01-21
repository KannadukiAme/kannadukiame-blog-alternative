import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ThemeContext } from '/components/Contexts.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'

const nav = [
  {
    name: 'HOME',
    href: '/',
  },
  {
    name: 'BLOG',
    href: '/posts',
  },
]

export default function Header() {
  const router = useRouter()
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="bg-gray-50 w-full dark:bg-stone-800">
      <div className="flex inset-x-0 container mx-auto justify-between z-10">
        <div className="flex px-2 py-4 space-x-6">
          <div className="text-gray-900 dark:text-gray-50 text-3xl font-bold">
            KannadukiAme's Blog
          </div>
        </div>
        <div className="flex px-2 py-2 space-x-6 items-center text-gray-800 dark:text-gray-100">
          {nav.map(({ name, href }, index) => (
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
          <FontAwesomeIcon
            icon={theme ? faSun : faMoon}
            className="cursor-pointer"
            onClick={() => setTheme(!theme)}
          />
        </div>
      </div>
    </div>
  )
}
