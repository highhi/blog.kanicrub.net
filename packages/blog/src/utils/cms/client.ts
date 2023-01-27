import { createClient } from 'microcms-js-sdk'

export const getCmsClient = () => {
  return createClient({
    serviceDomain: import.meta.env.CMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.CMS_API_KEY,
  })
}

export type BlogPosts = {
  contents: {
    id: string
    title: string
    category: {
      id: string
      name: string
    }
  }[]
}

export const getBlogPosts = (): Promise<BlogPosts> => {
  const client = getCmsClient()
  return client.get<BlogPosts>({ endpoint: 'blogs' })
}

export type BlogPostById = {
  title: string
  content: string
  publishedAt: string
  category: { name: string }
}

export const getBlogPostById = (id: string): Promise<BlogPostById> => {
  const client = getCmsClient()
  return client.getListDetail({ endpoint: 'blogs', contentId: id })
}
