// components/TaskList.tsx
import React from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const sorted = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="space-y-4">
      {sorted.length === 0 ? (
        <p className="text-gray-500">タスクがありません</p>
      ) : (
        sorted.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
