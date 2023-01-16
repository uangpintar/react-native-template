import React from 'react';
import SignIn from '../SignIn';
import { renderHook, act } from '@testing-library/react-hooks/native';
import { render, fireEvent, waitFor, cleanup } from '../../__mocks__/utils/wrapper';
import { useSignIn } from '../SignIn/hook';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

jest.mock('axios');

afterEach(cleanup);

describe('SignIn Screen Test', () => {
  beforeEach(() => {
    // Alternatively, set "clearMocks" in your Jest config to "true"
    jest.fn().mockClear();
  });

  it('should can input form and navigate', async () => {
    const email = 'testing@email.com';
    const password = '123345678';

    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    const inputEmail = getByPlaceholderText('Type Email');
    expect(inputEmail).toBeTruthy();
    fireEvent.changeText(inputEmail, email);

    const inputPassword = getByPlaceholderText('Type Password');
    expect(inputPassword).toBeTruthy();
    fireEvent.changeText(inputPassword, password);

    const btnSubmit = getByTestId('btn-submit');
    expect(btnSubmit).toBeTruthy();
    fireEvent.press(btnSubmit);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(1));
    expect(mockedNavigate).toHaveBeenCalledWith('HomeTabNavigator');
  });

  it('should show `hide-password` icon', () => {
    const { getByTestId } = render(<SignIn />);
    expect(getByTestId('icon-hide')).toBeTruthy();
  });

  it('should show `show-password` icon', () => {
    const { getByTestId } = render(<SignIn />);
    fireEvent.press(getByTestId('hide-password'));
    expect(getByTestId('icon-show')).toBeTruthy();
  });

  it('should show password icon', () => {
    const { result } = renderHook(() => useSignIn());
    expect(result.current.hidePassword).toBeTruthy();
  });

  it('should hide password text', () => {
    const { result } = renderHook(() => useSignIn());
    const { queryAllByTestId } = render(<SignIn />);

    expect(queryAllByTestId('icon-hide')).toBeDefined();
    expect(typeof result.current.onToggleHidePassword).toBe('function');
    expect(result.current.hidePassword).toBeTruthy();

    act(() => {
      result.current.onToggleHidePassword();
    });
    expect(queryAllByTestId('icon-show')).toBeDefined();
    expect(result.current.hidePassword).toBeFalsy();
  });
});
