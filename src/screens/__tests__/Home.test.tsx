import React from 'react';
import { fireEvent, render, waitFor } from '../../__mocks__/utils/wrapper';
import Home from '../Home';

describe('Home screen', () => {
  it('renders Home screen correctly', async () => {
    const screen = render(<Home />);
    await waitFor(() => expect(screen).toBeDefined());
  });

  it('should show text input', async () => {
    const { getByTestId, queryByTestId } = render(<Home />);
    fireEvent.press(getByTestId('btn-products'));
    await waitFor(() => expect(queryByTestId('input-products')).toBeDefined());
    // expect(getByTestId('input-products')).toBeDefined();
  });

  it('should not show text input', async () => {
    const { getByTestId, queryByTestId } = render(<Home />);
    fireEvent.press(getByTestId('btn-users'));
    await waitFor(() => expect(queryByTestId('input-products')).toBeFalsy());
  });
});
