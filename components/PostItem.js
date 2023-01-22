import Image from 'next/image'
import Link from 'next/link'

import Tag from '/components/Tag'

export default function PostItem({
  id,
  title,
  date,
  imageUrl,
  description,
  tags,
}) {
  return (
    <div className="flex flex-col gap-4 border">
      <Image src={imageUrl} alt={title} height={900} width={1600} />
      <div className="flex gap-2 ml-4">
        {tags.map((tag, index) => (
          <Tag text={tag} key={index} href={`/tags/${tag}`} />
        ))}
      </div>
      <Link
        className="hover:text-sora hover:underline font-bold ml-4"
        href={`/posts/${id}`}
      >
        {title}
      </Link>
      <div className="text-sm text-gray-400 ml-4 mb-4">{date}</div>
    </div>
  )
}
