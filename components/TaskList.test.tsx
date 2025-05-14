// components/TaskList.test.tsx
import React from 'react'
import type { ComponentProps } from 'react'
import { describe, beforeEach, it, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'
import useTaskStorage from '../hooks/useTaskStorage'
import TaskItem from './TaskItem'
import type { Task } from '../types/task'

vi.mock('../hooks/useTaskStorage')
vi.mock('./TaskItem')

const mockUseTaskStorage = vi.mocked(useTaskStorage)
const MockedTaskItem = vi.mocked(TaskItem)

type TaskItemProps = ComponentProps<typeof TaskItem>

describe('TaskListのテスト', () => {
  const toggleTaskMock = vi.fn()
  const deleteTaskMock = vi.fn()
  const defaultUseTaskStorageReturn = {
      tasks: [] as Task[],
      toggleTask: toggleTaskMock,
      deleteTask: deleteTaskMock,
      addTask: vi.fn(),
      updateTask: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseTaskStorage.mockReturnValue({
      ...defaultUseTaskStorageReturn
    })

    MockedTaskItem.mockImplementation((props: TaskItemProps) => {
      return (
        <div data-testid="mock-task-item" data-id={props.task.id}>
          {props.task.title}
          <button
            data-testid="toggle-btn"
            onClick={() => props.onToggle?.(props.task.id)}
          >
            toggle
          </button>
          <button
            data-testid="delete-btn"
            onClick={() => props.onDelete?.(props.task.id)}
          >
            delete
          </button>
        </div>
      )
    })
  })

  it('タスクが空のときに「タスクがありません」と表示すること', () => {
    mockUseTaskStorage.mockReturnValueOnce({
      ...defaultUseTaskStorageReturn,
      tasks: [] as Task[]
    })

    render(<TaskList />)
    expect(screen.getByText('タスクがありません')).toBeInTheDocument()
  })

  it('タスクが2つある時、TaskItemが2回描画されること', () => {
    const tasks: Task[] = [
      { id: '1', title: 'T1', description: '', completed: false },
      { id: '2', title: 'T2', description: '', completed: true },
    ]
    
    mockUseTaskStorage.mockReturnValueOnce({
      ...defaultUseTaskStorageReturn,
      tasks: tasks
    })

    render(<TaskList />)
    expect(screen.getAllByTestId('mock-task-item')).toHaveLength(tasks.length)
  })

  it('未完了タスクが先、完了タスクが後になる順序で描画されること', () => {
    const tasks: Task[] = [
      { id: 'a', title: '完了A', description: '', completed: true },
      { id: 'b', title: '未完了B', description: '', completed: false },
      { id: 'c', title: '完了C', description: '', completed: true },
      { id: 'd', title: '未完了D', description: '', completed: false },
    ]
    
    mockUseTaskStorage.mockReturnValue({
      ...defaultUseTaskStorageReturn,
      tasks: tasks
    })

    render(<TaskList />)

    const renderedIds = screen
      .getAllByTestId('mock-task-item')
      .map(el => el.getAttribute('data-id'))
    expect(renderedIds).toEqual(['b', 'd', 'a', 'c'])
  })

  it('編集ボタンを押した場合、onToggleに渡した関数が呼ばれること', async () => {
    const tasks: Task[] = [
      { id: 'x', title: 'タスクX', description: '', completed: false },
    ]

    mockUseTaskStorage.mockReturnValueOnce({
      ...defaultUseTaskStorageReturn,
      tasks: tasks,
      toggleTask: toggleTaskMock,
      deleteTask: deleteTaskMock,
    })

    render(<TaskList />)

    await screen.getByTestId('toggle-btn').click()
    expect(toggleTaskMock).toHaveBeenCalledWith('x')
  })

  it('削除ボタンを押した場合、onDeleteに渡した関数が呼ばれること', async () => {
    const tasks: Task[] = [
      { id: 'x', title: 'タスクX', description: '', completed: false },
    ]
    
    mockUseTaskStorage.mockReturnValueOnce({
      ...defaultUseTaskStorageReturn,
      tasks: tasks,
      toggleTask: toggleTaskMock,
      deleteTask: deleteTaskMock,
    })

    render(<TaskList />)

    await screen.getByTestId('delete-btn').click()
    expect(deleteTaskMock).toHaveBeenCalledWith('x')
  })
})