import Head from 'next/head'

import Header from 'components/Header'
import Footer from 'components/Footer'
import { TAGS_LIST, siteConfigs } from 'configs/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer } from '@fortawesome/free-solid-svg-icons'

/**
 * @returns paths: [{params: {tag: 'tag1'}}, {params: {tag: 'tag2'}}]
 */
export async function getStaticPaths() {
  const paths = TAGS_LIST.map((tag) => {
    return {
      params: {
        tag,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  return {
    props: {
      tag: params.tag,
    },
  }
}

export default function Tag({ tag }) {
  return (
    <div>
      <Head>
        <title>{`Tag:${tag} | ${siteConfigs.title}`}</title>
      </Head>
      <Header />
      <div className="flex w-full bg-white dark:bg-stone-900 dark:text-gray-50">
        <div className="container mx-auto mt-8 mb-[80px]">
          <div className="my-[300px] flex justify-center text-5xl">
            <FontAwesomeIcon className="mr-4" icon={faHammer} />
            <span>正在建设中...</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
