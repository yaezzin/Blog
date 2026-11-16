// 카테고리 표시 이름과 순서
// 폴더 이름(slug)이 키가 됩니다. 여기 없는 폴더도 자동으로 노출되며, 이름은 폴더명 그대로 쓰입니다.
// order가 작을수록 위에 표시됩니다.

export interface CategoryMeta {
  label?: string
  order?: number
  children?: Record<string, { label?: string; order?: number }>
}

export const categoryMeta: Record<string, CategoryMeta> = {
  backend: {
    label: 'Backend',
    order: 1,
    children: {
      django: { label: 'Django', order: 1 },
      drf: { label: 'DRF', order: 2 }
    }
  },
  infra: {
    label: 'Infra',
    order: 2,
    children: {
      aws: { label: 'AWS', order: 1 },
      cicd: { label: 'CI/CD', order: 2 }
    }
  },
  essay: { label: 'Essay', order: 3 }
}
