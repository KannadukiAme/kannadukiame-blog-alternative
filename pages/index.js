import Head from 'next/head'

import Header from 'components/Header'
import Article from 'components/Article'
import Footer from 'components/Footer'
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
  return (
    <div>
      <Head>
        <title>KannadukiAme's Blog</title>
      </Head>
      <Header />
      <div className="flex w-full bg-white dark:bg-stone-900 dark:text-gray-50">
        <div className="container mx-auto mt-8 mb-[80px]">
          {allPostsData.map(
            ({ id, title, date, image_url, description, tags }) => (
              <Article
                key={id}
                className="mt-10"
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
      </div>
      <Footer />
    </div>
  )
}
