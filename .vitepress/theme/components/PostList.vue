<script setup lang="ts">
import { withBase } from 'vitepress'
import type { Post } from '../posts.data'
import { labelOf, formatDate } from '../utils'

defineProps<{ posts: Post[]; showCategory?: boolean }>()
</script>

<template>
  <ul v-if="posts.length" class="post-list">
    <li v-for="p in posts" :key="p.url">
      <a class="post-item" :href="withBase(p.url)">
        <span class="pi-title">{{ p.title }}</span>
        <span v-if="p.description" class="pi-desc">{{ p.description }}</span>
        <span class="pi-meta">
          <time>{{ formatDate(p.date) }}</time>
          <span v-if="showCategory" class="pi-cat">
            {{ labelOf(p.parent) }}<template v-if="p.child"> / {{ labelOf(p.parent, p.child) }}</template>
          </span>
        </span>
      </a>
    </li>
  </ul>
  <p v-else class="empty">이 카테고리에는 아직 글이 없어요.</p>
</template>
