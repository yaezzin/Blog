<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

interface Heading { id: string; text: string; level: number }

const headings = ref<Heading[]>([])
const active = ref('')
const route = useRoute()

function collect() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.prose h2[id], .prose h3[id]'))
  headings.value = els.map((el) => {
    const clone = el.cloneNode(true) as HTMLElement
    clone.querySelectorAll('.header-anchor').forEach((a) => a.remove())
    return { id: el.id, text: clone.textContent?.trim() ?? '', level: el.tagName === 'H2' ? 2 : 3 }
  })
  onScroll()
}

function onScroll() {
  let cur = headings.value[0]?.id ?? ''
  for (const h of headings.value) {
    const el = document.getElementById(h.id)
    if (el && el.getBoundingClientRect().top < 120) cur = h.id
  }
  active.value = cur
}

onMounted(() => {
  collect()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
watch(() => route.path, () => nextTick(collect), { flush: 'post' })
</script>

<template>
  <aside v-if="headings.length" class="toc" aria-label="이 글의 목차">
    <p class="toc-title">이 글의 목차</p>
    <a
      v-for="h in headings"
      :key="h.id"
      :href="`#${h.id}`"
      class="toc-link"
      :class="{ active: active === h.id, sub: h.level === 3 }"
    >{{ h.text }}</a>
  </aside>
</template>
