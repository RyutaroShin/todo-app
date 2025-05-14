// app/[id]/edit/page.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import EditTaskPage from './page';
import { useRouter, useParams } from 'next/navigation';
import useTaskStorage from '../../../hooks/useTaskStorage';
import { Task } from '../../../types/task';

// モック（mock）の初期設定
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../../hooks/useTaskStorage', () => ({
  default: vi.fn(),
}));

describe('EditTaskPage コンポーネント', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'タスク1', description: '説明1', completed: false },
    { id: '2', title: 'タスク2', description: '説明2', completed: true },
  ];

  const mockRouter: any = {
    push: vi.fn(),
  };

  const mockUpdateTask = vi.fn();
  const mockDeleteTask = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(useParams).mockReturnValue({ id: '1' });

    vi.mocked(useTaskStorage).mockReturnValue({
      tasks: mockTasks,
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      addTask: vi.fn(),
      toggleTask: vi.fn(),
    });

    vi.clearAllMocks();
  });

  it('該当するタスクがない場合、「タスクが見つかりません」と表示すること', async () => {
    vi.mocked(useParams).mockReturnValue({ id: '999' }); // 存在しないタスクID

    render(<EditTaskPage />);
    expect(screen.getByText('タスクが見つかりません')).toBeInTheDocument();
  });

  it('該当するタスクが存在する場合、タイトルが描写されること', async () => {
    render(<EditTaskPage />);

    expect(screen.getByDisplayValue('タスク1')).toBeInTheDocument();
  });

  it('該当するタスクが存在する場合、詳細が描写されること', async () => {
    render(<EditTaskPage />);

    expect(screen.getByDisplayValue('説明1')).toBeInTheDocument();
  });

  it('フォーム送信時にupdateTaskが呼ばれ、ルートへリダイレクトされること', async () => {
    render(<EditTaskPage />);

    const user = userEvent.setup();

    // タイトルを変更
    const titleInput = screen.getByDisplayValue('タスク1');
    await user.clear(titleInput);
    await user.type(titleInput, '更新されたタイトル');

    // 説明を変更
    const descriptionInput = screen.getByDisplayValue('説明1');
    await user.clear(descriptionInput);
    await user.type(descriptionInput, '更新された説明');

    // フォームを送信
    await user.click(screen.getByRole('button', { name: '保存' }));

    // `updateTask` が呼び出されたか確認
    expect(mockUpdateTask).toHaveBeenCalledWith({
      id: '1',
      title: '更新されたタイトル',
      description: '更新された説明',
      completed: false, // `completed` の値を維持
    });

    // `router.push` が呼び出されたか確認
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('キャンセルボタンのリンクが「/」であること', async () => {
    render(<EditTaskPage />);

    // キャンセルボタンのリンクを確認
    const cancelButton = screen.getByRole('link', { name: 'キャンセル' });
    expect(cancelButton).toHaveAttribute('href', '/');
  });

  it('存在しないIDの場合、「タスクが見つかりません」と表示すること', async () => {
    vi.mocked(useParams).mockReturnValue({ id: '999' }); // 存在しないID

    render(<EditTaskPage />);

    // タスクが見つからない場合のメッセージ
    expect(screen.getByText('タスクが見つかりません')).toBeInTheDocument();
  });
});