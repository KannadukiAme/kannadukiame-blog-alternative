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

import PostType from 'types/post'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: Array<PostType> = fileNames.map((fileName) => {
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
      title: matterResult.data.title as string,
      date: new Date(matterResult.data.date).getTime() as number,
      imageUrl: matterResult.data.image_url as string,
      description: matterResult.data.description as string,
      tags: matterResult.data.tags as Array<string>,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => b.date - a.date)
}

/**
 * return ['id1', 'id2', ...]
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  const ids = fileNames.map((fileName) => fileName.replace(/\.md$/, ''))

  return ids
}

type MarkdownData = {
  post: PostType
  html: string
  toc: string
}

export async function getMarkdownFileContentById(
  id: string
): Promise<MarkdownData> {
  const fileName = id + '.md'
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  let tocHtml: string = ''
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
      customizeTOC(toc: any) {
        tocHtml = toHtml(toc)
      },
    } as any)
    .use(rehypeRewrite, {
      rewrite: (node, index, parent) => {
        if (
          node.type === 'element' &&
          node.properties &&
          node.properties.className === 'toc'
        ) {
          parent?.children.splice(index || 0, 1)
        }
      },
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content)
  console.timeEnd(timeTag)

  return {
    post: {
      id,
      title: matterResult.data.title,
      date: new Date(matterResult.data.date).getTime(),
      imageUrl: matterResult.data.image_url,
      description: matterResult.data.description,
      tags: matterResult.data.tags,
    },
    html: String(file),
    toc: tocHtml,
  }
}
