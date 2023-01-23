import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Header from 'components/Header'
import Footer from 'components/Footer'
import HashTag from 'components/HashTag'

import { TAGS_LIST } from 'configs/config'

export function getStaticProps() {
  const hashTags = TAGS_LIST.map((tag) => {
    return { text: tag, href: `/tags/${tag}` }
  })

  return {
    props: {
      hashTags,
    },
  }
}

export default function Index({ hashTags }) {
  const imageCoverUrl = '/images/eruruu-avatar.jpg'

  return (
    <div>
      <Head>
        <title>KannadukiAme's Blog</title>
      </Head>
      <Header />
      <div className="flex w-full bg-white dark:bg-stone-900 dark:text-gray-50">
        <div className="container mx-auto mt-[200px] mb-[200px]">
          <div className="flex justify-center gap-[3rem]">
            <Image
              className="rounded-full w-[200px]"
              src={imageCoverUrl}
              alt={'eruruu'}
              width={1000}
              height={1000}
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl text-sora font-bold">雨的小屋</h1>
              <span className="text-xl text-gray-500">
                一些美少女赏析及杂谈、动画漫画游戏轻小说等原作和改编作的品鉴...
              </span>
              <div>
                <Link
                  className="text-6xl inline hover:text-sora hover:underline"
                  href={'/posts'}
                >
                  NEXT...
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-[3rem] mt-[2rem]">
            {hashTags.map((tag, index) => (
              <HashTag
                key={index}
                text={tag.text}
                href={tag.href}
                count={tag.count}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
