import React from 'react';
import App from '../index';
import { render } from '../__mocks__/utils/wrapper';

describe('Testing App', () => {
  test('should render App correctly', () => {
    const rendered = render(<App />);

    expect(rendered).toBeDefined();
  });
});
