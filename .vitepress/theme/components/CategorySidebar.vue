<script setup lang="ts">
import { reactive, watch } from 'vue'
import { withBase } from 'vitepress'
import type { CatNode } from '../utils'

const props = defineProps<{
  tree: CatNode[]
  current: { parent: string; child: string | null } | null
  total: number
  isHome: boolean
}>()

// 기본은 모두 펼침, 현재 카테고리는 항상 펼침
const collapsed = reactive<Record<string, boolean>>({})
watch(
  () => props.current?.parent,
  (p) => { if (p) collapsed[p] = false },
  { immediate: true }
)
</script>

<template>
  <nav class="cat-nav" aria-label="카테고리">
    <a class="cat-link cat-all" :class="{ active: isHome }" :href="withBase('/')">
      <span>전체 글</span><span class="count">{{ total }}</span>
    </a>

    <div v-for="n in tree" :key="n.slug" class="cat-group">
      <div class="cat-row">
        <button
          v-if="n.children.length"
          class="chev"
          :class="{ closed: collapsed[n.slug] }"
          :aria-expanded="!collapsed[n.slug]"
          :aria-label="`${n.label} ${collapsed[n.slug] ? '펼치기' : '접기'}`"
          @click="collapsed[n.slug] = !collapsed[n.slug]"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <span v-else class="chev-space" />
        <a
          class="cat-link parent"
          :class="{ active: current?.parent === n.slug && !current?.child }"
          :href="withBase(n.url)"
        >
          <span>{{ n.label }}</span><span class="count">{{ n.count }}</span>
        </a>
      </div>

      <div v-if="n.children.length && !collapsed[n.slug]" class="cat-children">
        <a
          v-for="c in n.children"
          :key="c.slug"
          class="cat-link child"
          :class="{ active: current?.parent === n.slug && current?.child === c.slug }"
          :href="withBase(c.url)"
        >
          <span>{{ c.label }}</span><span class="count">{{ c.count }}</span>
        </a>
      </div>
    </div>
  </nav>
</template>
