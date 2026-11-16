---
title: GitHub Actions 캐시 활용하기
date: 2026-08-30
description: 의존성 캐시로 빌드 시간을 줄이는 방법
tags: [github-actions]
---

## 기본 캐시

`actions/setup-node`나 `actions/setup-python`은 `cache` 옵션 하나로 의존성 캐시를 켤 수 있습니다.

```yaml
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
```
