import Link from 'next/link'
import { useRouter } from 'next/router'

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

  return (
    <div className="h-[52px] bg-white w-full">
      <div className="flex inset-x-0 container mx-auto justify-between z-10">
        <div className="flex px-2 py-2 space-x-6">
          <div className="text-gray-900 text-3xl font-bold">
            KannadukiAme's Blog
          </div>
        </div>
        <div className="flex px-2 py-2 space-x-6 items-center">
          {nav.map(({ name, href }, index) => (
            <Link
              key={index}
              className={`text-gray-500 font-bold hover:text-sora ${
                router.asPath === href ? 'text-sora' : ''
              } `}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
