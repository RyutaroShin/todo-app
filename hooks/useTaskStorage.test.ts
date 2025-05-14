// hooks/useTaskStorage.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useTaskStorage from './useTaskStorage'
import { Task } from '../types/task'

const TEST_KEY = 'tasks_test'

describe('useTaskStorageのテスト', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('useTaskStorageで初期タスクを取得できること', () => {
    const initialTasks: Task[] = [
      { id: '1', title: '初期タスク1', description: '初期タスク1詳細', completed: false },
      { id: '2', title: '初期タスク2', description: '初期タスク2詳細', completed: true }
    ]
    localStorage.setItem(TEST_KEY, JSON.stringify(initialTasks))

    const { result } = renderHook(() => useTaskStorage({ key: TEST_KEY }))

    expect(result.current.tasks).toEqual(initialTasks)
  })

  it('addTaskでタスクを追加できること', () => {
    const { result } = renderHook(() => useTaskStorage({ key: TEST_KEY }))

    const newTask: Task = { id: 'abc-123', title: '追加タスク', description: '追加タスク詳細', completed: false }
    act(() => {
      result.current.addTask(newTask)
    })

    expect(result.current.tasks).toContainEqual(newTask)
    const stored = JSON.parse(localStorage.getItem(TEST_KEY) || '[]')
    expect(stored).toContainEqual(newTask)
  })

  it('updateTaskで既存タスクを更新できること', () => {
    // まず初期タスクをセット
    const initial: Task[] = [
      { id: '1', title: '初期タスク', description: '初期タスク詳細', completed: false },
    ]
    localStorage.setItem(TEST_KEY, JSON.stringify(initial))

    const { result } = renderHook(() => useTaskStorage({ key: TEST_KEY }))

    const updatedTask: Task = { id: '1', title: '更新タスク', description: '更新タスク詳細', completed: false }
    act(() => {
      result.current.updateTask(updatedTask)
    })

    expect(result.current.tasks).toContainEqual(updatedTask)
    const stored = JSON.parse(localStorage.getItem(TEST_KEY) || '[]')
    expect(stored).toContainEqual(updatedTask)
  })

  it('toggleTaskで未完了から完了に変更できること', () => {
    const initial: Task[] = [
      { id: '1', title: '初期タスク', description: '初期タスク詳細', completed: false },
    ]
    localStorage.setItem(TEST_KEY, JSON.stringify(initial))

    const { result } = renderHook(() => useTaskStorage({ key: TEST_KEY }))

    act(() => {
      result.current.toggleTask('1')
    })

    expect(result.current.tasks[0].completed).toBe(true)
    const stored = JSON.parse(localStorage.getItem(TEST_KEY) || '[]')
    expect(stored[0].completed).toBe(true)
  })

  it('toggleTaskで完了から未完了に変更できること', () => {
    const initial: Task[] = [
      { id: '1', title: '初期タスク', description: '初期タスク詳細', completed: true },
    ]
    localStorage.setItem(TEST_KEY, JSON.stringify(initial))

    const { result } = renderHook(() => useTaskStorage({ key: TEST_KEY }))

    act(() => {
      result.current.toggleTask('1')
    })

    expect(result.current.tasks[0].completed).toBe(false)
    const stored = JSON.parse(localStorage.getItem(TEST_KEY) || '[]')
    expect(stored[0].completed).toBe(false)
  })

  it('deleteTaskでタスクを削除できる', () => {
    const initial: Task[] = [
      { id: '1', title: '削除対象タスク', description: '削除対象タスク詳細', completed: false },
      { id: '2', title: '残留対象タスク', description: '残留対象タスク詳細', completed: false },
    ]
    localStorage.setItem(TEST_KEY, JSON.stringify(initial))

    const { result } = renderHook(() => useTaskStorage({ key: TEST_KEY }))

    act(() => {
      result.current.deleteTask('1')
    })

    expect(result.current.tasks).toEqual([
      { id: '2', title: '残留対象タスク', description: '残留対象タスク詳細', completed: false },
    ])
    const stored = JSON.parse(localStorage.getItem(TEST_KEY) || '[]')
    expect(stored).toEqual([
      { id: '2', title: '残留対象タスク', description: '残留対象タスク詳細', completed: false },
    ])
  })
})