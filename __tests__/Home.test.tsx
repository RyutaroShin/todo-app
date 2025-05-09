import React from 'react'
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { describe, expect, it } from 'vitest';

describe('Home', () => {
  it('renders headline', () => {
    render(<Home />);
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });
});