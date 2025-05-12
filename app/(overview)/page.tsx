// app/overview/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TaskList from '../../components/TaskList';
import useTaskStorage from '../../hooks/useTaskStorage';

export default function Page() {
  const { tasks } = useTaskStorage({
    key: 'task-list',
  });
  const router = useRouter();

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">タスク一覧ページ</h1>
      <button
        onClick={() => router.push('/new')}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        作成
      </button>
      <TaskList tasks={tasks} />
    </main>
  );
}