---
title: Serializer 설계 패턴
date: 2026-10-12
description: 읽기용과 쓰기용 serializer를 나누는 기준
tags: [drf]
---

하나의 serializer로 조회와 생성을 모두 처리하다 보면 필드 조건이 점점 복잡해집니다.

## 읽기와 쓰기를 분리하기

```python
class OrderReadSerializer(serializers.ModelSerializer):
    user = UserSummarySerializer()

    class Meta:
        model = Order
        fields = ["id", "user", "status", "created_at"]


class OrderWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["items", "memo"]
```

## ViewSet에서 선택하기

```python
def get_serializer_class(self):
    if self.action in ("list", "retrieve"):
        return OrderReadSerializer
    return OrderWriteSerializer
```
