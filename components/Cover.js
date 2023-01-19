import Link from 'next/link'

export default function Cover({ title, date, imageUrl, description, tags }) {
  return (
    <div
      className="flex bg-no-repeat bg-cover px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${imageUrl}')`,
      }}
    >
      <div className="flex flex-col container mx-auto self-center">
        <div className="text-4xl text-white font-bold md:text-6xl text-center">
          {title}
        </div>
        <div className="text-base text-white text-right font-bold mt-8">
          {date}
        </div>
        <div className="flex space-x-2 justify-center">
          {tags.map((tag, index) => (
            <Link
              className="tag--white text-base text-white font-bold"
              key={index}
              href={`/tags/${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
        <div className="text-white text-xl md:text-2xl font-bold mt-12">
          {description}
        </div>
      </div>
    </div>
  )
}
