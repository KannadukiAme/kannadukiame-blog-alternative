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
import rehypeRewrite from 'rehype-rewrite'
import { toHtml } from 'hast-util-to-html'
import { format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'posts')
const formatDateFunc = (date) => format(date, 'MMM dd, yyyy')

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
  return allPostsData
    .sort((a, b) => {
      return b.date - a.date
    })
    .map((data) => {
      data.date = formatDateFunc(data.date)

      return data
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
  const timeTag = `from ${fileName} to html time`
  console.time(timeTag)
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeToc, {
      headings: ['h1', 'h2'],
      cssClasses: {
        toc: 'toc',
      },
      customizeTOC(toc) {
        tocHtml = toHtml(toc)
      },
    })
    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (node.type === 'element' && node.properties.className === 'toc') {
          parent.children.splice(index, 1)
        }
      },
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content)
  console.timeEnd(timeTag)

  return {
    data: {
      ...matterResult.data,
      date: formatDateFunc(matterResult.data.date),
    },
    html: String(file),
    toc: tocHtml,
  }
}
