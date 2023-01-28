import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ThemeContext } from '/components/Contexts.js'
import { Autocomplete } from '/components/Autocomplete'
import { SearchItem } from '/components/SearchItem'
import { siteConfigs } from 'configs/config'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import '@algolia/autocomplete-theme-classic'

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

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
)

export default function Header() {
  const router = useRouter()
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="bg-gray-50 w-full dark:bg-stone-800">
      <div className="flex inset-x-0 container mx-auto justify-between z-10">
        <div className="flex px-2 py-4 space-x-6">
          <div className="text-gray-900 dark:text-gray-50 text-3xl font-bold">
            {siteConfigs.title}
          </div>
        </div>
        <div className="flex px-2 py-2 space-x-6 items-center text-gray-800 dark:text-gray-100">
          <div>
            <Autocomplete
              openOnFocus={true}
              getSources={({ query }) => [
                {
                  sourceId: 'products',
                  getItems() {
                    return getAlgoliaResults({
                      searchClient,
                      queries: [
                        {
                          indexName: 'posts',
                          query,
                        },
                      ],
                    })
                  },
                  templates: {
                    item({ item, components }) {
                      return <SearchItem hit={item} components={components} />
                    },
                  },
                },
              ]}
            />
          </div>
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
          <div className="before:content-[''] before:mr-5 before:text-gray-500 before:border-r">
            <FontAwesomeIcon
              icon={theme ? faSun : faMoon}
              className="cursor-pointer"
              onClick={() => setTheme(!theme)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
