import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

import Header from 'components/Header'
import Article from 'components/Article'
import Footer from 'components/Footer'
import HashTag from 'components/HashTag'
import { getSortedPostsData } from 'libs/api'

export function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Index({ allPostsData }) {
  const imageCoverUrl = '/images/eruruu-avatar.jpg'

  const hashTags = [
    {
      text: '美少女',
      href: '/tags/美少女',
      count: 22,
    },
    {
      text: '动画',
      href: '/tags/动画',
      count: 2,
    },
    {
      text: '游戏',
      href: '/tags/动画',
      count: 3,
    },
    {
      text: '轻小说',
      href: '/tags/动画',
      count: 1,
    },
    {
      text: '漫画',
      href: '/tags/动画',
      count: 2,
    },
  ]

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
