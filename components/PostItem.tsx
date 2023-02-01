import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

import Tag from 'components/Tag'
import PostType from 'types/post'

export default function PostItem({
  id,
  title,
  date,
  imageUrl,
  tags,
}: PostType) {
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
      <div className="text-sm text-gray-400 ml-4 mb-4">
        {format(date, 'MMM dd, yyyy')}
      </div>
    </div>
  )
}
