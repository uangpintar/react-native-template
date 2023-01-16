import React from 'react';
import { render, waitFor } from '../../__mocks__/utils/wrapper';
import Setting from '../Setting';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('Setting screen', () => {
  it('Render Setting screen', async () => {
    const setting = render(<Setting />);
    await waitFor(() => expect(setting).toBeDefined());
  });
});
