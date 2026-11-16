# YJ's dev log

VitePress로 만든 개인 블로그입니다. GitHub Pages로 무료 배포됩니다.

## 처음 배포하기

1. GitHub에 새 레포지토리를 만들고 이 폴더 전체를 push
   - 레포 이름을 `아이디.github.io`로 하면 주소가 `https://아이디.github.io`
   - 다른 이름이면 `https://아이디.github.io/레포이름/` (base 경로는 워크플로가 자동 처리)
2. 레포의 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 변경
3. `main` 브랜치에 push할 때마다 자동으로 빌드·배포됩니다 (Actions 탭에서 진행 상황 확인)

## 로컬에서 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

## 글 쓰기

`posts/` 아래 폴더 구조가 그대로 카테고리가 됩니다.

```
posts/
  backend/            → 상위 카테고리
    django/           → 하위 카테고리
      orm-query.md    → 글 (주소: /posts/backend/django/orm-query)
  essay/
    hello-world.md    → 하위 카테고리 없이 상위에 바로 둘 수도 있음
```

글 파일 맨 위에 frontmatter를 작성합니다.

```md
---
title: 글 제목              # 필수: 본문에 # 제목은 따로 쓰지 않아도 됩니다
date: 2026-11-16            # 필수: 최신순 정렬 기준
description: 목록에 보일 한 줄 요약
tags: [django, orm]
thumbnail: /images/orm.png    # 선택: 글 목록 카드에 표시될 이미지
draft: true                 # 선택: true면 목록에서 숨김
---

본문은 ## 소제목부터 시작하면 오른쪽 목차에 자동으로 잡힙니다.
```

썸네일 이미지는 `public/images/`에 넣고 `/images/파일명`으로 적으면 됩니다. 외부 이미지 URL(https://...)도 가능해요.

본문에서 쓸 수 있는 것: 일반 Markdown, 코드 블록(복사 버튼 포함), 표, 인용, `::: tip` / `::: warning` / `::: danger` 박스

## 카테고리 이름과 순서

`.vitepress/categories.ts`에서 폴더명별 표시 이름(label)과 순서(order)를 정합니다. 등록하지 않은 폴더도 자동으로 노출되고, 이름은 폴더명 그대로 쓰입니다.

## 폰트와 읽기 설정

- 기본 본문 폰트: Pretendard
- 상단 `가A` 버튼으로 독자가 본문 폰트 5종, 글자 크기(14~20px), 코드 폰트 2종을 바꿀 수 있고 브라우저에 저장됩니다
- 폰트 목록 수정: `.vitepress/theme/fonts.ts` (새 폰트를 추가하면 `.vitepress/config.mts`의 폰트 링크도 함께 추가)

## 구조

```
.vitepress/
  config.mts               사이트 설정 (제목, 폰트 로딩)
  categories.ts            카테고리 이름/순서
  theme/
    Layout.vue             전체 레이아웃
    posts.data.ts          빌드 시 글 목록 수집
    fonts.ts               폰트 옵션
    style.css              디자인
    components/            사이드바, 글 목록, 목차, 읽기 설정
category/[slug].md         카테고리 페이지 (빌드 시 자동 생성)
.github/workflows/deploy.yml
```

## 웹에서 글쓰기 (Sveltia CMS)

`https://yaezzin.github.io/Blog/admin/` 에서 브라우저로 글을 쓰고 수정할 수 있습니다. 저장하면 레포에 자동 커밋되고, 1~2분 뒤 블로그에 반영됩니다.

로그인 토큰 만들기 (최초 1회)
1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token
2. Repository access: **Only select repositories** → `Blog`
3. Permissions → Repository permissions → **Contents: Read and write**
4. 생성된 토큰을 관리자 페이지의 **Sign In with Token**에 붙여넣기 (브라우저에 저장됨)

사용법
- 왼쪽 폴더 트리 = 카테고리. 폴더를 고르고 새 글을 만들면 그 카테고리에 저장됩니다
- 새 카테고리는 CMS에서 폴더를 새로 만들면 생기고, 표시 이름/순서는 `.vitepress/categories.ts`에서 정합니다
- 이미지는 에디터에서 바로 업로드 가능 (`public/images`에 저장)
- 설정 파일: `public/admin/config.yml`
