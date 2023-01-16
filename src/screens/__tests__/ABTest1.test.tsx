import { renderHook } from '@testing-library/react-hooks/native';
import React from 'react';
import { fireEvent, render, waitFor } from '../../__mocks__/utils/wrapper';
import { ABTest1 } from '../ABTesting';
import { useABTesting } from '../ABTesting/hook';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockedNavigate }),
}));

describe('ABTest1 screen', () => {
  it('should remote config screen can render', async () => {
    const settingRender = render(<ABTest1 />);
    await waitFor(() => expect(settingRender).toBeDefined());
  });

  it('should can action', async () => {
    const { result } = renderHook(() => useABTesting());

    const { getByTestId } = render(<ABTest1 />);
    const btnRefresh = getByTestId('btn-refresh');
    expect(btnRefresh).toBeTruthy();
    fireEvent.press(btnRefresh);
    expect(typeof result.current.onFetch).toBe('function');

    const btnBack = getByTestId('btn-back');
    expect(btnBack).toBeTruthy();
    fireEvent.press(btnBack);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(1));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});
