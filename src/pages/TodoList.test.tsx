import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('renders without crashing', () => {
    expect(() => render(<TodoList />)).not.toThrow();
  });
});