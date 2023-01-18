import Head from 'next/head'
import Layout from '../components/Layout'
import Article from '../components/Article'

import { getSortedPostsData } from '../libs/api'

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
    <Layout>
      <Head>
        <title>KannadukiAme's Blog</title>
      </Head>
      {allPostsData.map(({ id, title, date, image_url, description, tags }) => (
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
      ))}
    </Layout>
  )
}
