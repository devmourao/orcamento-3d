import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

function asEntries(entry: unknown) {
  if (!entry) return []
  return Array.isArray(entry) ? entry : [entry]
}

function stripHtml(html = '') {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

type BloggerText = { $t?: string }
type BloggerLink = { rel?: string; href?: string }
type BloggerCategory = { term?: string }
type BloggerEntry = {
  id?: BloggerText
  title?: BloggerText
  content?: BloggerText
  summary?: BloggerText
  published?: BloggerText
  updated?: BloggerText
  link?: BloggerLink[]
  media$thumbnail?: { url?: string }
  author?: Array<{ name?: BloggerText }>
  category?: BloggerCategory[]
}

function parseEntry(entry: BloggerEntry) {
  const html = entry.content?.$t || entry.summary?.$t || ''
  const alternate =
    entry.link?.find((link) => link.rel === 'alternate')?.href || ''
  const thumbnail = entry.media$thumbnail?.url?.replace(
    /\/s\d+(?:-c)?\//,
    '/s800/',
  )

  const text = stripHtml(html)

  return {
    id: entry.id?.$t || alternate,
    title: entry.title?.$t?.trim() || 'Untitled',
    content: html,
    summary: text.length > 220 ? `${text.slice(0, 220).trim()}…` : text,
    published: entry.published?.$t || '',
    updated: entry.updated?.$t || entry.published?.$t || '',
    url: alternate,
    thumbnail,
    author: { name: entry.author?.[0]?.name?.$t || 'Unknown' },
    categories: (entry.category || [])
      .map((category) => category.term)
      .filter((term): term is string => Boolean(term)),
  }
}

/** Local `/api/blog` mirror of the Netlify function for Vite dev. */
function blogApiPlugin(): Plugin {
  return {
    name: 'maker-blog-api',
    configureServer(server) {
      server.middlewares.use('/api/blog', async (req, res) => {
        try {
          const requestUrl = new URL(req.url || '', 'http://localhost')
          const hub = requestUrl.searchParams.get('hub') || 'maker'
          const type = requestUrl.searchParams.get('type') || 'laboratorio'
          const max = requestUrl.searchParams.get('max') || '50'

          const feedUrl =
            `https://blog.mourao.info/feeds/posts/default/-/${encodeURIComponent(hub)}/${encodeURIComponent(type)}` +
            `?alt=json&max-results=${encodeURIComponent(max)}`

          const response = await fetch(feedUrl, {
            headers: { Accept: 'application/json' },
          })

          if (!response.ok) {
            throw new Error(`Blogger HTTP ${response.status}`)
          }

          const data = (await response.json()) as {
            feed?: {
              title?: { $t?: string }
              subtitle?: { $t?: string }
              updated?: { $t?: string }
              entry?: unknown
            }
          }
          const posts = asEntries(data.feed?.entry).map((entry) =>
            parseEntry(entry as BloggerEntry),
          )

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              title: data.feed?.title?.$t || 'Blog Mourão Info',
              subtitle: data.feed?.subtitle?.$t || '',
              updated: data.feed?.updated?.$t || '',
              posts,
            }),
          )
        } catch (error) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              title: 'Blog Mourão Info',
              subtitle: 'Feed unavailable',
              updated: new Date().toISOString(),
              posts: [],
              error: error instanceof Error ? error.message : 'Unknown error',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), blogApiPlugin()],
})
