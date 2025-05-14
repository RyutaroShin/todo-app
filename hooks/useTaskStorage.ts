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

  return { tasks: localState, addTask: addTask };
}
