import { format } from 'date-fns'

import HashTag from './HashTag'

type Props = {
  title: string
  date: number
  imageUrl: string
  description: string
  tags: Array<string>
}

export default function Cover({
  title,
  date,
  imageUrl,
  description,
  tags,
}: Props) {
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
          <div className="text-base text-right font-bold mt-8">
            {format(date, 'MMM dd, yyyy')}
          </div>
          <div className="flex justify-center gap-[2rem]">
            {tags.map((tag, index) => (
              <HashTag key={index} text={tag} href={`/tags/${tag}`} />
            ))}
          </div>
          <div className="text-xl md:text-2xl font-bold mt-12">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
