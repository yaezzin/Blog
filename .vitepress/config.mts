import { defineConfig } from 'vitepress'
import { bodyFonts, codeFonts, STORAGE_KEY } from './theme/fonts'

// 페이지가 그려지기 전에 저장된 폰트 설정을 적용해 깜빡임을 막는 스크립트
const fontMap = {
  body: Object.fromEntries(bodyFonts.map((f) => [f.id, f.family])),
  code: Object.fromEntries(codeFonts.map((f) => [f.id, f.family]))
}
const applySavedSettings = `(function(){try{var m=${JSON.stringify(fontMap)};var s=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'{}');var r=document.documentElement.style;if(m.body[s.body])r.setProperty('--reader-font',m.body[s.body]);if(m.code[s.code])r.setProperty('--reader-code-font',m.code[s.code]);if(s.size)r.setProperty('--reader-size',s.size+'px')}catch(e){}})()`

export default defineConfig({
  base: process.env.BASE || '/',
  lang: 'ko-KR',
  title: "YJ's dev log",
  description: '개발하면서 배운 것들을 기록합니다',
  cleanUrls: true,
  srcExclude: ['README.md'],
  head: [
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=IBM+Plex+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;500;700&family=Gowun+Batang:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Nanum+Gothic+Coding:wght@400;700&display=swap' }],
    ['script', {}, applySavedSettings]
  ],
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  }
})
