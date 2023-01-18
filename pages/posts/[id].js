import Layout from '../../components/Layout'
import Head from 'next/head'
import { getMarkdownFileContentById, getAllPostIds } from '../../libs/api'

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
    <Layout>
      <Head>
        <title>{`${data.title} | KannadukiAme's Blog`}</title>
      </Head>
      <article
        className="prose max-w-none hover:prose-a:text-sora"
        dangerouslySetInnerHTML={{ __html: html }}
      ></article>
    </Layout>
  )
}
