import Head from 'next/head'

import Header from 'components/Header'
import PostItem from 'components/PostItem'
import PostItemForList from 'components/PostItemForList'
import Footer from 'components/Footer'
import { getSortedPostsData } from 'libs/api'
import { siteConfigs } from 'configs/config'
import { useState } from 'react'

export function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Index({ allPostsData }) {
  const numOfPosts = allPostsData.length | 0
  const [isGrid, setIsGrid] = useState(true)

  return (
    <div>
      <Head>
        <title>{`BLOG | ${siteConfigs.title}`}</title>
      </Head>
      <Header />
      <div className="flex w-full bg-white dark:bg-stone-900 dark:text-gray-50">
        <div className="container mx-auto mt-8 mb-[80px]">
          <div className="mb-2">{`共 ${numOfPosts} 篇文章`}</div>
          {isGrid ? (
            <div className="grid grid-cols-3 grid-rows-2 gap-5">
              {allPostsData.map(
                ({ id, title, date, image_url, description, tags }) => (
                  <PostItem
                    key={id}
                    id={id}
                    title={title}
                    date={date}
                    imageUrl={image_url}
                    description={description}
                    tags={tags}
                  />
                )
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {allPostsData.map(
                ({ id, title, date, image_url, description, tags }) => (
                  <PostItemForList
                    key={id}
                    id={id}
                    title={title}
                    date={date}
                    tags={tags}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
