// app/new/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useTaskStorage from '../../hooks/useTaskStorage';
import Link from 'next/link';

export default function NewTaskPage() {
  const router = useRouter();
  const { addTask } = useTaskStorage({ key: 'task-list' });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      description,
      completed: false, 
    });

    router.push('/');
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">新規タスク作成</h1>
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
          <Link
            href="/"
            className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            className="inline-block mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
          >
            作成
          </button>
        </div>
      </form>
    </main>
  );
}
