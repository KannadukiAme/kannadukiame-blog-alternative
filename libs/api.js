import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeToc from '@jsdevtools/rehype-toc'
import { toHtml } from 'hast-util-to-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * return ['id1', 'id2', ...]
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  const ids = fileNames.map((fileName) => fileName.replace(/\.md$/, ''))

  return ids
}

export async function getMarkdownFileContentById(id) {
  const fileName = id + '.md'

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  let tocHtml = null
  /**
   * DIRTY CODE TO BE REFACTORED
   */
  console.time('mdToHtml')
  await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeToc, {
      headings: ['h1', 'h2'],
      cssClasses: {
        toc: 'page-outline',
        link: 'page-link',
      },
      customizeTOC(toc) {
        tocHtml = toHtml(toc)
      },
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content)

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content)
  console.timeEnd('mdToHtml')

  return {
    data: matterResult.data,
    html: String(file),
    toc: tocHtml,
  }
}
