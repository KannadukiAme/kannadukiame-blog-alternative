require('dotenv').config()
const fs = require('fs')
const matter = require('gray-matter')
const path = require('path')
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)
const index = client.initIndex('posts')

const postsDirectory = path.join(process.cwd(), 'posts')
const fileNames = fs.readdirSync(postsDirectory)
const allPostsData = fileNames.map((fileName) => {
  const id = fileName.replace(/\.md$/, '')

  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  return {
    id,
    ...matterResult.data,
  }
})

index.clearObjects().then(() => {
  // done
  index.saveObjects(allPostsData, { autoGenerateObjectIDIfNotExist: true })
})
