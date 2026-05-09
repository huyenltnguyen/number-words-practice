import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders language selection before mode selection', () => {
    render(<App />);

    const languageLabel = screen.getByText('language:');
    const modeLabel = screen.getByText('mode:');

    expect(
      languageLabel.compareDocumentPosition(modeLabel) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
