// app/[id]/edit/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useTaskStorage from '../../../hooks/useTaskStorage';
import { Task } from '../../../types/task';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { tasks, updateTask } = useTaskStorage({ key: 'task-list' });

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const target = tasks.find(t => t.id === params.id);
    if (target) {
      setTask(target);
      setTitle(target.title);
      setDescription(target.description);
    }
  }, [params.id, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    updateTask({
      ...task,
      title,
      description,
    });

    router.push('/');
  };

  if (!task) {
    return <div className="p-4 text-center">タスクが見つかりません</div>;
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">タスクを編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">説明</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded border"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </form>
    </main>
  );
}