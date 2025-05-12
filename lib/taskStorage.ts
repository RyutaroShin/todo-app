import { Task } from '../types/task';

const STORAGE_KEY = 'task-list';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

export function getTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addDummyTask(): void {
  if (typeof window === 'undefined') return;

  const tasks = getTasks();
  const newTask: Task = {
    id: generateId(),
    title: 'ダミータスク ' + (tasks.length + 1),
    description: 'これはテスト用のダミータスクです。',
    completed: false,
  };
  const updated = [...tasks, newTask];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
