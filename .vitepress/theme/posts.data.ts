import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  description: string
  tags: string[]
  parent: string
  child: string | null
}

declare const data: Post[]
export { data }

function toDate(d: unknown): string {
  if (!d) return ''
  if (d instanceof Date) return d.toISOString().slice(0, 10)
  return String(d).slice(0, 10)
}

// posts/상위/하위/글.md → 상위/하위 카테고리
// posts/상위/글.md     → 상위 카테고리만
export default createContentLoader('posts/**/*.md', {
  transform(raw): Post[] {
    return raw
      .filter((p) => !p.frontmatter.draft)
      .map((p) => {
        const url = p.url.replace(/\.html$/, '')
        const seg = url.replace(/^\/posts\//, '').split('/')
        return {
          title: p.frontmatter.title ?? seg[seg.length - 1],
          url,
          date: toDate(p.frontmatter.date),
          description: p.frontmatter.description ?? '',
          tags: p.frontmatter.tags ?? [],
          parent: seg[0],
          child: seg.length >= 3 ? seg[1] : null
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }
})
