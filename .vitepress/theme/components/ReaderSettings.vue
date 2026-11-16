<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { bodyFonts, codeFonts, DEFAULTS, STORAGE_KEY, SIZE_MIN, SIZE_MAX } from '../fonts'

const open = ref(false)
const root = ref<HTMLElement>()
const s = reactive({ ...DEFAULTS })

function apply() {
  const r = document.documentElement.style
  r.setProperty('--reader-font', (bodyFonts.find((f) => f.id === s.body) ?? bodyFonts[0]).family)
  r.setProperty('--reader-code-font', (codeFonts.find((f) => f.id === s.code) ?? codeFonts[0]).family)
  r.setProperty('--reader-size', `${s.size}px`)
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch {}
}

function changeSize(d: number) {
  s.size = Math.min(SIZE_MAX, Math.max(SIZE_MIN, s.size + d))
}

function reset() {
  Object.assign(s, DEFAULTS)
}

function onOutside(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (bodyFonts.some((f) => f.id === saved.body)) s.body = saved.body
    if (codeFonts.some((f) => f.id === saved.code)) s.code = saved.code
    if (typeof saved.size === 'number') s.size = Math.min(SIZE_MAX, Math.max(SIZE_MIN, saved.size))
  } catch {}
  watch(s, apply, { deep: true })
  document.addEventListener('click', onOutside)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onOutside)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="reader">
    <button class="icon-btn reader-btn" :aria-expanded="open" aria-label="읽기 설정" @click="open = !open">
      <span class="aa">가<small>A</small></span>
    </button>

    <div v-if="open" class="reader-panel" role="dialog" aria-label="읽기 설정">
      <p class="rp-label">본문 글꼴</p>
      <div class="rp-fonts">
        <button
          v-for="f in bodyFonts"
          :key="f.id"
          class="rp-font"
          :class="{ on: s.body === f.id }"
          :style="{ fontFamily: f.family }"
          :aria-pressed="s.body === f.id"
          @click="s.body = f.id"
        >
          <span class="rp-sample">가나다 Aa</span>
          <span class="rp-name">{{ f.label }}</span>
        </button>
      </div>

      <p class="rp-label">글자 크기</p>
      <div class="rp-size">
        <button class="rp-step" :disabled="s.size <= SIZE_MIN" aria-label="글자 작게" @click="changeSize(-1)">가</button>
        <div class="rp-track" aria-hidden="true">
          <span v-for="n in SIZE_MAX - SIZE_MIN + 1" :key="n" class="rp-dot" :class="{ on: n - 1 + SIZE_MIN <= s.size }" />
        </div>
        <button class="rp-step big" :disabled="s.size >= SIZE_MAX" aria-label="글자 크게" @click="changeSize(1)">가</button>
        <span class="rp-val">{{ s.size }}px</span>
      </div>

      <p class="rp-label">코드 글꼴</p>
      <div class="rp-code">
        <button
          v-for="f in codeFonts"
          :key="f.id"
          class="rp-chip"
          :class="{ on: s.code === f.id }"
          :style="{ fontFamily: f.family }"
          :aria-pressed="s.code === f.id"
          @click="s.code = f.id"
        >{{ f.label }}</button>
      </div>

      <button class="rp-reset" @click="reset">기본값으로 되돌리기</button>
    </div>
  </div>
</template>
