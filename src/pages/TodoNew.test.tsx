import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TodoNew from './TodoNew';

describe('TodoNew', () => {
  it('renders without crashing', () => {
    expect(() => render(<TodoNew />)).not.toThrow();
  });
});