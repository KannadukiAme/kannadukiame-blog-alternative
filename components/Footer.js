import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <div className="h-[200px] bg-gray-50 dark:bg-stone-800 flex flex-col justify-center items-center py-8 text-gray-500 dark:text-gray-300">
      <div>
        Powered by
        <a
          className="hover:text-sora ml-1"
          target="_blank"
          href="https://nextjs.org/"
        >
          Next.js
          <FontAwesomeIcon className="ml-1" icon={faExternalLinkAlt} />
        </a>
      </div>
      <div>Copyright © 2023 KannadukiAme</div>
    </div>
  )
}
