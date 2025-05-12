// components/TaskItem.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '../types/task';

type Props = {
  task: Task;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const TaskItem = ({ task, onToggle, onDelete }: Props) => {
  const router = useRouter();

  return (
    <div className="p-4 border rounded shadow-sm bg-white flex items-start justify-between">
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle?.(task.id)}
          className="mt-1 accent-blue-500"
        />
        <div>
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description || '（詳細なし）'}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button
          className="text-blue-500 text-sm hover:underline"
          onClick={() => router.push(`/${task.id}/edit`)}
        >
          編集
        </button>
        <button
          className="text-red-500 text-sm hover:underline"
          onClick={() => {
            if (window.confirm('このタスクを削除してもよろしいですか？')) {
              onDelete?.(task.id);
            }
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
