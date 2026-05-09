import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ExerciseCard from './ExerciseCard';

const mockSpeak = vi.fn();

vi.mock('../../hooks/useSpeech', () => ({
  useSpeech: () => ({
    speak: mockSpeak,
    speaking: false,
    supported: true,
  }),
}));

describe('ExerciseCard', () => {
  beforeEach(() => {
    mockSpeak.mockClear();
  });

  it('speaks with Ctrl+. in words-to-number mode without submitting', () => {
    const onSubmit = vi.fn();

    render(
      <ExerciseCard
        number={42}
        language="en"
        mode="words-to-number"
        onSubmit={onSubmit}
        disabled={false}
      />
    );

    const input = screen.getByLabelText(/type the number as digits/i);
    input.focus();

    const playEvent = new KeyboardEvent('keydown', {
      key: '.',
      code: 'Period',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });

    input.dispatchEvent(playEvent);

    expect(playEvent.defaultPrevented).toBe(true);
    expect(mockSpeak).toHaveBeenCalledWith('forty-two', 'en-US');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('speaks with Meta+. in words-to-number mode without submitting', () => {
    const onSubmit = vi.fn();

    render(
      <ExerciseCard
        number={42}
        language="en"
        mode="words-to-number"
        onSubmit={onSubmit}
        disabled={false}
      />
    );

    const input = screen.getByLabelText(/type the number as digits/i);
    input.focus();

    expect(fireEvent.keyDown(input, { key: '.', code: 'Period', metaKey: true })).toBe(false);
    expect(mockSpeak).toHaveBeenCalledWith('forty-two', 'en-US');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not use Ctrl+. in number-to-words mode', () => {
    render(
      <ExerciseCard
        number={42}
        language="en"
        mode="number-to-words"
        onSubmit={vi.fn()}
        disabled={false}
      />
    );

    const textarea = screen.getByLabelText(/type the number in english words/i);
    textarea.focus();

    expect(fireEvent.keyDown(textarea, { key: '.', code: 'Period', ctrlKey: true })).toBe(true);
    expect(mockSpeak).not.toHaveBeenCalled();
  });

  it('still submits with Ctrl+Enter in words-to-number mode', () => {
    const onSubmit = vi.fn();

    render(
      <ExerciseCard
        number={42}
        language="en"
        mode="words-to-number"
        onSubmit={onSubmit}
        disabled={false}
      />
    );

    const input = screen.getByLabelText(/type the number as digits/i);
    fireEvent.change(input, { target: { value: '42' } });

    expect(fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true })).toBe(false);
    expect(onSubmit).toHaveBeenCalledWith('42');
  });

  it('renders the speak button with cross-platform shortcut guidance', () => {
    render(
      <ExerciseCard
        number={42}
        language="en"
        mode="words-to-number"
        onSubmit={vi.fn()}
        disabled={false}
      />
    );

    expect(
      screen.getByRole('button', {
        name: 'Listen to pronunciation (Ctrl+. or Cmd+.)',
      })
    ).toBeInTheDocument();
  });
});
