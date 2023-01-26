import Link from 'next/link'

export default function PostItemForList({ id, title, date, tags }) {
  return (
    <div className="flex justify-between px-4 gap-[2rem]">
      <Link
        className="hover:text-sora hover:underline font-bold"
        href={`/posts/${id}`}
      >
        {title}
      </Link>
      <div className="text-sm text-gray-400">{date}</div>
    </div>
  )
}
