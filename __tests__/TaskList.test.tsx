import React from 'react'
import { render, screen } from '@testing-library/react';
import Page from '../app/(overview)/page';
import { describe, expect, it } from 'vitest';

describe('Home', () => {
  it('renders headline', () => {
    render(<Page />);
    expect(screen.getByText(/タスク一覧ページ/i)).toBeInTheDocument();
  });
});