import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Feedback from './Feedback';

describe('Feedback', () => {
  it('shows a Result button label when the round is complete', () => {
    render(
      <Feedback
        result={{ correct: true, normalizedInput: '42', expected: '42' }}
        onNext={vi.fn()}
        actionLabel="result"
      />
    );

    expect(screen.getByRole('button', { name: /result/i })).toBeInTheDocument();
  });
});
