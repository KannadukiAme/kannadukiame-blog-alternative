import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

type Props = {
  text: string
  href: string
}

export default function Tag({ text, href }: Props) {
  return (
    <Link
      className="border border-sora px-2 py-1 text-sm text-sora hover:bg-sora hover:text-gray-100"
      href={href}
    >
      <FontAwesomeIcon className="mr-2" icon={faTag} />
      {text}
    </Link>
  )
}
