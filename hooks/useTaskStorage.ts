// hooks/useTaskStorage.ts
import { useState, useEffect } from 'react';
import { Task } from '../types/task';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

type useTaskStorageProps = {
  key: string;
};

export default function useTaskStorage(props: useTaskStorageProps) {
  const [localState, setLocalState] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(props.key);
    if (storedTasks) {
      setLocalState(JSON.parse(storedTasks));
    }
  }, [props.key]);

  const addTask = (task: Task) => {
    const updated = [...localState, task];
    localStorage.setItem(props.key, JSON.stringify(updated));
    setLocalState(updated);
  };

  const updateTask = (updatedTask: Task) => {
    const updated = localState.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem(props.key, JSON.stringify(updated));
    setLocalState(updated);
  };

  const toggleTask = (id: string) => {
    const updated = localState.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setLocalState(updated);
    localStorage.setItem(props.key, JSON.stringify(updated));
  };

  const deleteTask = (id: string) => {
    const updated = localState.filter((task) => task.id !== id);
    setLocalState(updated);
    localStorage.setItem(props.key, JSON.stringify(updated));
  };

  return {
    tasks: localState,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}
