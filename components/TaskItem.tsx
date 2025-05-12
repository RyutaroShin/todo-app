import React from 'react';
import { Task } from '../types/task';

type Props = {
  task: Task;
};

const TaskItem = ({ task }: Props) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white flex items-start justify-between">
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="mt-1 accent-blue-500"
        />
        <div>
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-600">{task.description || '（詳細なし）'}</p>
        </div>
      </div>
      <button
        className="text-red-500 text-sm hover:underline"
        disabled
      >
        削除
      </button>
    </div>
  );
};

export default TaskItem;
