import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

export default function Article({
  id,
  title,
  date,
  imageUrl,
  description,
  tags,
}) {
  return (
    <div className="flex bg-white my-5">
      <div className="hidden md:block md:w-1/3">
        <Image src={imageUrl} alt={title} height={900} width={1600} />
      </div>
      <div className="md:w-2/3 px-8">
        <div className="mb-3">
          <Link
            className="text-3xl font-bold hover:text-sora"
            href={`/posts/${id}`}
          >
            {title}
          </Link>
        </div>
        <div className="mb-2 text-gray-400 text-lg">
          <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />
          {date}
        </div>
        {/* <div className="flex text-sm space-x-2 mb-5"><g-link className="tag" v-for="(tag, index) in post.node.tags" :key="index" :to="`/tags/${tag}`">{{ tag }}</g-link></div> */}
        <div className="flex text-lg space-x-2 mb-5">
          {tags.map((tag, index) => (
            <div className="tag" key={index}>
              {tag}
            </div>
          ))}
        </div>
        <div className="text-lg leading-relaxed">{description}</div>
      </div>
    </div>
  )
}
