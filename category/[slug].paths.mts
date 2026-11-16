import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// posts 폴더 구조를 읽어서 카테고리 페이지를 미리 생성합니다.
// /category/backend, /category/backend-django 형태의 주소가 만들어집니다.
const postsDir = fileURLToPath(new URL('../posts', import.meta.url))

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return walk(full)
    return e.name.endsWith('.md') ? [full] : []
  })
}

export default {
  watch: ['../posts/**/*.md'],
  paths() {
    const routes = new Map<string, { slug: string; parent: string; child: string }>()
    for (const file of walk(postsDir)) {
      const seg = path.relative(postsDir, file).split(path.sep)
      if (seg.length < 2) continue
      const parent = seg[0]
      routes.set(parent, { slug: parent, parent, child: '' })
      if (seg.length >= 3) {
        const child = seg[1]
        routes.set(`${parent}-${child}`, { slug: `${parent}-${child}`, parent, child })
      }
    }
    return [...routes.values()].map((params) => ({ params }))
  }
}
