// components/TaskItem.test.tsx
import React from 'react'
import { describe, it, beforeEach, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from './TaskItem'
import { Task } from '../types/task'

// next/link をシンプルな <a> に置き換え
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

// useRouter をダミー実装
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('TaskItemのテスト', () => {
  let mockToggle: (id: string) => void
  let mockDelete: (id: string) => void
  const task: Task = {
    id: '1',
    title: 'テストタイトル',
    description: 'テスト説明',
    completed: false,
  }

  beforeEach(() => {
    mockToggle = vi.fn()
    mockDelete = vi.fn()
  })

  it('タイトルが正しく表示されること', () => {
    render(<TaskItem task={task} />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(task.title)
  })

  it('詳細が正しく表示されること', () => {
    render(<TaskItem task={task} />)
    expect(screen.getByText(task.description)).toBeInTheDocument()
  })

  it('未対応状態の場合、チェックボックスがオフとなること', () => {
    const pendingTask = { ...task, completed: false }
    render(<TaskItem task={pendingTask} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('完了状態の場合、チェックボックスがオンとなること', () => {
    const completedTask = { ...task, completed: true }
    render(<TaskItem task={completedTask} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('編集ボタンの遷移先が正しいこと', () => {
    render(<TaskItem task={task} />)
    const editLink = screen.getByRole('link', { name: /編集/ })
    expect(editLink).toHaveAttribute('href', `/${task.id}/edit`)
  })

  it('削除ボタンが表示されること', () => {
    render(<TaskItem task={task} />)
    const deleteBtn = screen.getByRole('button', { name: /削除/ })
    expect(deleteBtn).toBeInTheDocument()
  })

  it('descriptionが空文字のときは「（詳細なし）」と表示されること', () => {
    const noDesc = { ...task, description: '' }
    render(<TaskItem task={noDesc} />)
    expect(screen.getByText('（詳細なし）')).toBeInTheDocument()
  })

  it('チェックボックスをクリックするとonToggleが呼ばれること', async () => {
    render(<TaskItem task={task} onToggle={mockToggle} />)
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(mockToggle).toHaveBeenCalledWith(task.id)
  })

  it('削除ボタンをクリックすると確認ダイアログが表示されること', async () => {
    global.confirm = vi.fn(() => true)

    render(<TaskItem task={task} onDelete={mockDelete} />)
    const deleteBtn = screen.getByRole('button', { name: /削除/ })
    await userEvent.click(deleteBtn)

    expect(global.confirm).toHaveBeenCalledWith(
      'このタスクを削除してもよろしいですか？'
    )
  })

  it('確認ダイアログでOKを選択した場合、onDeleteが呼ばれること', async () => {
    global.confirm = vi.fn(() => true)

    render(<TaskItem task={task} onDelete={mockDelete} />)
    const deleteBtn = screen.getByRole('button', { name: /削除/ })
    await userEvent.click(deleteBtn)

    expect(global.confirm).toHaveBeenCalled()
    expect(mockDelete).toHaveBeenCalledWith(task.id)
  })

  it('確認ダイアログでキャンセルを選択した場合、onDeleteが呼ばれないこと', async () => {
    global.confirm = vi.fn(() => false)

    render(<TaskItem task={task} onDelete={mockDelete} />)
    const deleteBtn = screen.getByRole('button', { name: /削除/ })
    await userEvent.click(deleteBtn)

    expect(global.confirm).toHaveBeenCalled()
    expect(mockDelete).not.toHaveBeenCalled()
  })
})