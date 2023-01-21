import Head from 'next/head'

import Header from 'components/Header'
import Cover from 'components/Cover'
import Footer from 'components/Footer'
import { getMarkdownFileContentById, getAllPostIds } from 'libs/api'

/**
 * @returns paths: [{params: {id: 'id1'}}, {params: {id: 'id2'}}]
 */
export async function getStaticPaths() {
  const ids = getAllPostIds()
  const paths = ids.map((id) => {
    return {
      params: {
        id: id,
      },
    }
  })

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export function getStaticProps({ params }) {
  const { data, html } = getMarkdownFileContentById(params.id)

  return {
    props: {
      data,
      html,
    },
  }
}

/**
 *
 * @param { data, html }
 * @returns
 */
export default function Post({ data, html }) {
  return (
    <div className="grid grid-rows-[68px_minmax(340px,_calc(100vh-120px))_minmax(300px,_1fr)_120px] dark:text-gray-50">
      <Head>
        <title>{`${data.title} | KannadukiAme's Blog`}</title>
      </Head>
      <Header />
      <Cover
        title={data.title}
        date={data.date}
        imageUrl={data.image_url}
        description={data.description}
        tags={data.tags}
      ></Cover>
      <div className="flex w-full bg-white dark:bg-stone-900">
        <div className="container mx-auto mt-8 mb-[80px] ">
          <article
            className="prose max-w-none hover:prose-a:text-sora dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html }}
          ></article>
        </div>
      </div>
      <Footer />
    </div>
  )
}
