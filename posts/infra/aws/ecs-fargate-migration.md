---
title: Elastic Beanstalk에서 ECS Fargate로
date: 2026-11-13
description: 이전을 결정한 이유와 과정에서 신경 쓴 부분
tags: [aws, ecs]
---

## 왜 옮겼나

배포 단위를 컨테이너로 통일하고, 워커와 API를 독립적으로 확장하기 위해서였습니다.

## 준비한 것

- 서비스별 Task Definition 분리
- 환경 변수는 SSM Parameter Store로 이전
- 헬스체크 경로 정리

::: warning
ALB 헬스체크 경로가 인증을 요구하면 태스크가 계속 재시작됩니다.
:::
