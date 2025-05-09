import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TodoEdit from './TodoEdit';

describe('TodoEdit', () => {
  it('renders without crashing', () => {
    expect(() => render(<TodoEdit />)).not.toThrow();
  });
});