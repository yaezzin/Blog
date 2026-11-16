---
title: Django ORM 쿼리 최적화 정리
date: 2026-11-16
description: select_related와 prefetch_related를 언제 쓰는지, N+1 문제를 찾는 방법까지
tags: [django, orm]
---

N+1 문제는 생각보다 자주, 그리고 조용히 발생합니다. 목록 API 하나가 수백 개의 쿼리를 날리고 있어도 응답이 느려지기 전까지는 눈치채기 어렵습니다.

## N+1 문제란

주문 목록을 가져오면서 각 주문의 사용자 정보에 접근하면, 주문 1건마다 사용자 조회 쿼리가 추가로 실행됩니다.

```python
orders = Order.objects.all()
for order in orders:
    print(order.user.nickname)  # 주문마다 쿼리 1회
```

## 해결 방법

### select_related

정참조(ForeignKey, OneToOne)는 JOIN으로 한 번에 가져옵니다.

```python
orders = Order.objects.select_related("user")
```

### prefetch_related

역참조나 ManyToMany는 쿼리를 따로 실행한 뒤 파이썬에서 묶어줍니다.

```python
orders = Order.objects.prefetch_related("items")
```

| 메서드 | 대상 관계 | 동작 방식 |
| --- | --- | --- |
| `select_related` | FK, 1:1 | SQL JOIN |
| `prefetch_related` | 역참조, M:N | 쿼리 분리 후 결합 |

::: tip
개발 환경에서 `django-debug-toolbar`를 켜두면 페이지별 쿼리 수를 바로 확인할 수 있어요.
:::

## 정리

> 쿼리 수는 데이터 양이 아니라 코드 구조가 결정한다.

목록을 반환하는 API를 만들 때는 습관적으로 관계 필드 접근 여부를 확인하는 게 좋습니다.
