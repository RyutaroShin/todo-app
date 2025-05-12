// components/TaskList.tsx
'use client';

import React from 'react';
import TaskItem from './TaskItem';
import useTaskStorage from '../hooks/useTaskStorage';

const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useTaskStorage({ key: 'task-list' });

  const sorted = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="space-y-4">
      {sorted.length === 0 ? (
        <p className="text-gray-500">タスクがありません</p>
      ) : (
        sorted.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
