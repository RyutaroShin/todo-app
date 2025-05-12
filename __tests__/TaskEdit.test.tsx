import React from 'react'
import { render, screen } from '@testing-library/react';
import Page from '../app/[id]/edit/page';
import { describe, expect, it } from 'vitest';

describe('Home', () => {
  it('renders headline', () => {
    render(<Page />);
    expect(screen.getByText(/タスク編集ページ/i)).toBeInTheDocument();
  });
});