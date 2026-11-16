export interface FontOption {
  id: string
  label: string
  family: string
}

export const bodyFonts: FontOption[] = [
  { id: 'pretendard', label: 'Pretendard', family: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif" },
  { id: 'noto-sans', label: 'Noto Sans KR', family: "'Noto Sans KR', sans-serif" },
  { id: 'plex', label: 'IBM Plex Sans KR', family: "'IBM Plex Sans KR', sans-serif" },
  { id: 'noto-serif', label: 'Noto Serif KR', family: "'Noto Serif KR', serif" },
  { id: 'gowun', label: '고운바탕', family: "'Gowun Batang', serif" }
]

export const codeFonts: FontOption[] = [
  { id: 'jetbrains', label: 'JetBrains Mono', family: "'JetBrains Mono', ui-monospace, monospace" },
  { id: 'nanum-coding', label: '나눔고딕코딩', family: "'Nanum Gothic Coding', ui-monospace, monospace" }
]

export const SIZE_MIN = 14
export const SIZE_MAX = 20
export const STORAGE_KEY = 'reader-settings'

export const DEFAULTS = { body: 'pretendard', code: 'jetbrains', size: 16 }
