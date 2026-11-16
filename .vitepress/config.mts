import { defineConfig } from 'vitepress'

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
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap' }],
  ],
  themeConfig: {
    github: 'https://github.com/yaezzin',
    profile: {
      name: '전예진',
      role: 'Backend Developer',
      bio: '안정적인 서비스 뒤에 있는 구조와 데이터를 고민하는 개발자입니다.',
      // 사진을 넣으려면 public/images/에 파일을 넣고 경로를 적어주세요. 비워두면 이니셜로 표시됩니다.
      avatar: '/images/profile.jpg',
      initials: 'YJ'
    }
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  }
})
