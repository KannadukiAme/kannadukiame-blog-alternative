import Head from 'next/head'

import Header from 'components/Header'
import PostItem from 'components/PostItem'
import Footer from 'components/Footer'

export default function Index() {
  return (
    <div>
      <Head>
        <title>BLOG | KannadukiAme's Blog</title>
      </Head>
      <Header />
      <div className="flex w-full">
        <div className="container mx-auto mt-8 mb-[80px]">
          <PostItem></PostItem>
        </div>
      </div>
      <Footer />
    </div>
  )
}
