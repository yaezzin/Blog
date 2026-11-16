<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Post } from '../posts.data'
import { labelOf, formatDate } from '../utils'

defineProps<{ posts: Post[]; showCategory?: boolean }>()

// /images/... 처럼 사이트 내부 경로면 base를 붙이고, 외부 URL은 그대로 사용
const imgSrc = (src: string) => (/^https?:\/\//.test(src) ? src : withBase(src))
</script>

<template>
  <ul v-if="posts.length" class="post-list">
    <li v-for="p in posts" :key="p.url">
      <a class="post-item" :class="{ 'has-thumb': p.thumbnail }" :href="withBase(p.url)">
        <span class="pi-text">
          <span class="pi-title">{{ p.title }}</span>
          <span v-if="p.description" class="pi-desc">{{ p.description }}</span>
          <span class="pi-meta">
            <time>{{ formatDate(p.date) }}</time>
            <span v-if="showCategory" class="pi-cat">
              {{ labelOf(p.parent) }}<template v-if="p.child"> / {{ labelOf(p.parent, p.child) }}</template>
            </span>
          </span>
        </span>
        <span v-if="p.thumbnail" class="pi-thumb">
          <img :src="imgSrc(p.thumbnail)" :alt="''" loading="lazy" decoding="async" />
        </span>
      </a>
    </li>
  </ul>
  <p v-else class="empty">이 카테고리에는 아직 글이 없어요.</p>
</template>
