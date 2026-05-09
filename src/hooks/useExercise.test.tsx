import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EXERCISES_PER_ROUND } from '../constants/session';
import { useExercise } from './useExercise';

describe('useExercise', () => {
  it('shows the final answer feedback before ending the round', () => {
    const { result } = renderHook(() => useExercise());

    for (let index = 0; index < EXERCISES_PER_ROUND - 1; index += 1) {
      act(() => {
        result.current.submit(result.current.exercise.expected);
      });

      act(() => {
        result.current.next();
      });
    }

    act(() => {
      result.current.submit(result.current.exercise.expected);
    });

    expect(result.current.score.total).toBe(EXERCISES_PER_ROUND);
    expect(result.current.score.gameOver).toBe(false);
    expect(result.current.result).not.toBeNull();

    act(() => {
      result.current.next();
    });

    expect(result.current.score.gameOver).toBe(true);
  });
});
