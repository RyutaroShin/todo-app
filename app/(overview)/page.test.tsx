// app/(overview)/page.test.tsx
import React from 'react'
import { describe, it, beforeEach, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

vi.mock('../../components/TaskList', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-task-list" />,
}))

describe('app/(overview)/page.tsxのテスト', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('見出し「タスク一覧ページ」が描画されること', () => {
    render(<Page />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'タスク一覧ページ',
      })
    ).toBeInTheDocument()
  })

  it('「作成」リンクが 「/new」になっていること', () => {
    render(<Page />)
    const createLink = screen.getByRole('link', { name: '作成' })
    expect(createLink).toHaveAttribute('href', '/new')
  })

  it('TaskListコンポーネントがマウントされること', () => {
    render(<Page />)
    expect(screen.getByTestId('mock-task-list')).toBeInTheDocument()
  })
})