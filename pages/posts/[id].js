import Layout from "../../components/Layout"
import Head from "next/head"
import {getMarkdownFileContentById} from '../../libs/api'

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}

export default function Post(){
  console.log(getMarkdownFileContentById('Noe_Isurugi'))

  return (
    <Layout>
      <Head>
        <title>文章标题 | KannadukiAme's Blog</title>
      </Head>
      文章内容
    </Layout>
  )
}