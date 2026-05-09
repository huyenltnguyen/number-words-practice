import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ModeSelector from './ModeSelector';

describe('ModeSelector', () => {
  it('updates the mode from the select control', () => {
    const onChange = vi.fn();

    render(<ModeSelector mode="number-to-words" onChange={onChange} />);

    fireEvent.change(screen.getByTestId('mode-select'), {
      target: { value: 'words-to-number' },
    });

    expect(onChange).toHaveBeenCalledWith('words-to-number');
  });
});
