import { categoryMeta } from '../categories'
import type { Post } from './posts.data'

export interface CatNode {
  slug: string
  label: string
  url: string
  count: number
  order: number
  children: CatNode[]
}

export const categorySlug = (parent: string, child?: string | null) =>
  child ? `${parent}-${child}` : parent

export const categoryUrl = (parent: string, child?: string | null) =>
  `/category/${categorySlug(parent, child)}`

export function labelOf(parent: string, child?: string | null) {
  const meta = categoryMeta[parent]
  if (!child) return meta?.label ?? parent
  return meta?.children?.[child]?.label ?? child
}

const byOrder = (a: CatNode, b: CatNode) => a.order - b.order || a.label.localeCompare(b.label)

export function buildTree(posts: Post[]): CatNode[] {
  const map = new Map<string, { count: number; children: Map<string, number> }>()
  for (const p of posts) {
    const entry = map.get(p.parent) ?? { count: 0, children: new Map() }
    entry.count++
    if (p.child) entry.children.set(p.child, (entry.children.get(p.child) ?? 0) + 1)
    map.set(p.parent, entry)
  }

  return [...map]
    .map(([slug, e]) => ({
      slug,
      label: labelOf(slug),
      url: categoryUrl(slug),
      count: e.count,
      order: categoryMeta[slug]?.order ?? 999,
      children: [...e.children]
        .map(([c, n]) => ({
          slug: c,
          label: labelOf(slug, c),
          url: categoryUrl(slug, c),
          count: n,
          order: categoryMeta[slug]?.children?.[c]?.order ?? 999,
          children: []
        }))
        .sort(byOrder)
    }))
    .sort(byOrder)
}

export const formatDate = (d: string) => (d ? d.replace(/-/g, '.') : '')
