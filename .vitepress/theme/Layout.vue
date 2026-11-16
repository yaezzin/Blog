<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useData, useRoute, withBase, Content } from 'vitepress'
import { data as posts } from './posts.data'
import { buildTree, categoryUrl, labelOf, formatDate } from './utils'
import CategorySidebar from './components/CategorySidebar.vue'
import PostList from './components/PostList.vue'
import Toc from './components/Toc.vue'

const { page, frontmatter, params, site, theme, isDark } = useData()
const route = useRoute()
const sidebarOpen = ref(false)
watch(() => route.path, () => (sidebarOpen.value = false))

const tree = computed(() => buildTree(posts))

const pageType = computed(() => {
  if (page.value.isNotFound) return '404'
  const p = page.value.relativePath
  if (p === 'index.md') return 'home'
  if (p.startsWith('category/')) return 'category'
  if (p.startsWith('posts/')) return 'post'
  return 'page'
})

const currentPost = computed(() =>
  posts.find((p) => p.url === '/' + page.value.relativePath.replace(/\.md$/, ''))
)

const currentCat = computed(() => {
  if (pageType.value === 'category' && params.value)
    return { parent: params.value.parent as string, child: (params.value.child as string) || null }
  if (pageType.value === 'post' && currentPost.value)
    return { parent: currentPost.value.parent, child: currentPost.value.child }
  return null
})

const categoryPosts = computed(() => {
  const c = currentCat.value
  if (!c) return []
  return posts.filter((p) => p.parent === c.parent && (!c.child || p.child === c.child))
})

function toggleDark() {
  isDark.value = !isDark.value
}

// 코드 블록 복사 버튼
function onCopyClick(e: MouseEvent) {
  const btn = (e.target as HTMLElement).closest('button.copy')
  if (!btn) return
  const pre = btn.parentElement?.querySelector('pre')
  if (!pre) return
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.classList.add('copied')
    setTimeout(() => btn.classList.remove('copied'), 1500)
  })
}
onMounted(() => document.addEventListener('click', onCopyClick))
onUnmounted(() => document.removeEventListener('click', onCopyClick))
</script>

<template>
  <div class="layout">
    <header class="topbar">
      <button class="icon-btn menu-btn" aria-label="카테고리 열기" @click="sidebarOpen = !sidebarOpen">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <a class="brand" :href="withBase('/')">{{ site.title }}</a>
      <div class="top-actions">
        <a
          v-if="theme.github"
          class="icon-btn"
          :href="theme.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
        </a>
        <button class="icon-btn" :aria-label="isDark ? '라이트 모드로 전환' : '다크 모드로 전환'" @click="toggleDark">
          <svg v-if="isDark" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
        </button>
      </div>
    </header>

    <div class="frame">
      <aside class="sidebar" :class="{ open: sidebarOpen }">
        <CategorySidebar :tree="tree" :current="currentCat" :total="posts.length" :is-home="pageType === 'home'" />
      </aside>
      <div v-if="sidebarOpen" class="backdrop" @click="sidebarOpen = false" />

      <main class="main">
        <section v-if="pageType === 'home'" class="listing">
          <div v-if="theme.profile" class="profile">
            <img v-if="theme.profile.avatar" class="profile-avatar" :src="withBase(theme.profile.avatar)" alt="" />
            <span v-else class="profile-avatar initials" aria-hidden="true">{{ theme.profile.initials }}</span>
            <div class="profile-text">
              <p class="profile-name">{{ theme.profile.name }}</p>
              <p class="profile-role">{{ theme.profile.role }}</p>
              <p class="profile-bio">{{ theme.profile.bio }}</p>
            </div>
          </div>
          <h1 class="page-title">전체 글</h1>
          <p class="page-sub">글 {{ posts.length }}개</p>
          <PostList :posts="posts" show-category />
        </section>

        <section v-else-if="pageType === 'category' && currentCat" class="listing">
          <nav class="crumb">
            <a :href="withBase(categoryUrl(currentCat.parent))">{{ labelOf(currentCat.parent) }}</a>
            <template v-if="currentCat.child">
              <span class="crumb-sep">/</span>
              <span>{{ labelOf(currentCat.parent, currentCat.child) }}</span>
            </template>
          </nav>
          <h1 class="page-title">{{ labelOf(currentCat.parent, currentCat.child) }}</h1>
          <p class="page-sub">글 {{ categoryPosts.length }}개</p>
          <PostList :posts="categoryPosts" :show-category="!currentCat.child" />
        </section>

        <div v-else-if="pageType === 'post'" class="post-wrap">
          <article class="post">
            <nav v-if="currentCat" class="crumb">
              <a :href="withBase(categoryUrl(currentCat.parent))">{{ labelOf(currentCat.parent) }}</a>
              <template v-if="currentCat.child">
                <span class="crumb-sep">/</span>
                <a :href="withBase(categoryUrl(currentCat.parent, currentCat.child))">{{ labelOf(currentCat.parent, currentCat.child) }}</a>
              </template>
            </nav>
            <h1 class="post-title">{{ frontmatter.title }}</h1>
            <div class="post-meta">
              <time v-if="currentPost?.date">{{ formatDate(currentPost.date) }}</time>
              <span v-for="t in currentPost?.tags ?? []" :key="t" class="tag">#{{ t }}</span>
            </div>
            <Content class="prose" />
          </article>
          <Toc />
        </div>

        <section v-else-if="pageType === '404'" class="listing">
          <h1 class="page-title">페이지를 찾을 수 없어요</h1>
          <p class="page-sub">주소가 바뀌었거나 삭제된 글일 수 있어요.</p>
          <a class="home-link" :href="withBase('/')">전체 글 보기</a>
        </section>

        <article v-else class="post">
          <Content class="prose" />
        </article>
      </main>
    </div>
  </div>
</template>
