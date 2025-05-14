// app/new/page.test.tsx
import React from 'react'
import { describe, it, beforeEach, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewTaskPage from './page'

const pushMock = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

const addTaskMock = vi.fn()
vi.mock('../../hooks/useTaskStorage', () => ({
  __esModule: true,
  default: () => ({ addTask: addTaskMock }),
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

describe('app/new/page.tsxのテスト', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('見出し「新規タスク作成」が描画されること', () => {
    render(<NewTaskPage />)
    expect(
      screen.getByRole('heading', { level: 1, name: '新規タスク作成' })
    ).toBeInTheDocument()
  })

  it('見出し「タイトル」が描画されること', () => {
    render(<NewTaskPage />)
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument()
  })

  it('見出し「説明」が描画されること', () => {
    render(<NewTaskPage />)
    expect(screen.getAllByRole('textbox')[1]).toBeInTheDocument()
  })

  it('「キャンセル」のリンクが 「"/"」であること', () => {
    render(<NewTaskPage />)
    const cancelLink = screen.getByRole('link', { name: 'キャンセル' })
    expect(cancelLink).toBeInTheDocument()
    expect(cancelLink).toHaveAttribute('href', '/')
  })

  it('「作成」ボタンが描画される', () => {
    render(<NewTaskPage />)
    expect(
      screen.getByRole('button', { name: '作成', hidden: false })
    ).toBeInTheDocument()
  })

  it('タイトルが空のまま送信した時、addTaskとrouter.pushは呼ばれないこと(必死項目エラーとなること)', async () => {
    render(<NewTaskPage />)
    await userEvent.click(screen.getByRole('button', { name: '作成' }))
    expect(addTaskMock).not.toHaveBeenCalled()
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('タイトル・説明を入力して送信した時、addTaskとrouter.pushが呼ばれること', async () => {
    render(<NewTaskPage />)
    const textboxes = screen.getAllByRole('textbox')
    const titleInput = textboxes[0]
    const descriptionTextarea = textboxes[1]

    await userEvent.type(titleInput, 'テストタイトル')
    await userEvent.type(descriptionTextarea, 'テスト説明')
    await userEvent.click(screen.getByRole('button', { name: '作成' }))

    expect(addTaskMock).toHaveBeenCalledTimes(1)
    expect(addTaskMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        title: 'テストタイトル',
        description: 'テスト説明',
        completed: false,
      })
    )
    expect(pushMock).toHaveBeenCalledWith('/')
  })
})