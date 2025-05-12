'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Task } from '../types/task';
import { getTasks } from '../lib/taskStorage';
import TaskItem from './TaskItem';

const TaskList = ({ refresh }: { refresh: boolean }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadedTasks = getTasks();
    const sorted = [...loadedTasks].sort((a, b) => Number(a.completed) - Number(b.completed));
    setTasks(sorted);
  }, [refresh]); // ← ここで refresh を監視

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">タスクがありません</p>
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
