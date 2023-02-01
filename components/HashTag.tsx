import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

type Props = {
  text: string
  href: string
}

export default function HashTag({ text, href }: Props) {
  return (
    <Link
      className="text-base font-bold hover:text-sora hover:underline"
      href={href}
    >
      <FontAwesomeIcon className="mr-1" icon={faHashtag} />
      {`${text}`}
    </Link>
  )
}
