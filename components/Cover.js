import Link from 'next/link'

export default function Cover({ title, date, imageUrl, description, tags }) {
  return (
    <div
      className="bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <div className="h-full flex px-4 dark:backdrop-brightness-50">
        <div className="flex flex-col container mx-auto self-center">
          <div className="text-4xl font-bold md:text-6xl text-center">
            {title}
          </div>
          <div className="text-base text-right font-bold mt-8">{date}</div>
          <div className="flex space-x-2 justify-center">
            {/* {tags.map((tag, index) => (
              <Link
                className="tag--white text-base font-bold"
                key={index}
                href={`/tags/${tag}`}
              >
                {tag}
              </Link>
            ))} */}
          </div>
          <div className="text-xl md:text-2xl font-bold mt-12">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
