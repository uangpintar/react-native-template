import React from 'react';
import { render, waitFor } from '../../__mocks__/utils/wrapper';
import RemoteConfig from '../RemoteConfig';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('RemoteConfig screen', () => {
  it('should remote config screen can render', async () => {
    const settingRender = render(<RemoteConfig />);
    await waitFor(() => expect(settingRender).toBeDefined());
  });
});
