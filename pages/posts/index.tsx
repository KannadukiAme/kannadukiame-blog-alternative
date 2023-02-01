import Head from 'next/head'

import Header from 'components/Header'
import PostItem from 'components/PostItem'
import Footer from 'components/Footer'
import { getSortedPostsData } from 'libs/api'
import { siteConfigs } from 'configs/config'
import PostType from 'types/post'

type Props = {
  allPostsData: Array<PostType>
}

export function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

export default function Index({ allPostsData }: Props) {
  const numOfPosts = allPostsData.length | 0
  return (
    <div>
      <Head>
        <title>{`BLOG | ${siteConfigs.title}`}</title>
      </Head>
      <Header />
      <div className="flex w-full bg-white dark:bg-stone-900 dark:text-gray-50">
        <div className="container mx-auto mt-8 mb-[80px]">
          <div className="mb-2">{`共 ${numOfPosts} 篇文章`}</div>
          <div className="grid grid-cols-3 grid-rows-2 gap-5">
            {allPostsData.map(
              ({ id, title, date, imageUrl, description, tags }) => (
                <PostItem
                  key={id}
                  id={id}
                  title={title}
                  date={date}
                  imageUrl={imageUrl}
                  description={description}
                  tags={tags}
                />
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
