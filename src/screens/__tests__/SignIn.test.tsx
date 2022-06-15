import { expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks/native';
import { cleanup, fireEvent, render, waitFor, act } from '@testing-library/react-native';
import React from 'react';
import SignIn from '../SignIn';
import { wrapper } from '../../__mocks__/wrapper';
import { useSignIn } from '../SignIn/hook';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

jest.mock('axios');

beforeEach(() => {
  // Alternatively, set "clearMocks" in your Jest config to "true"
  jest.fn().mockClear();
});

afterEach(() => {
  cleanup();
});

describe('SignIn Screen Test', () => {
  it('should can input form and navigate', async () => {
    const email = 'testing@email.com';
    const password = '123345678';

    const { getByPlaceholderText, getByTestId } = render(<SignIn />, { wrapper });

    const inputEmail = getByPlaceholderText('Type Email');
    expect(inputEmail).toBeTruthy();
    act(() => {
      fireEvent.changeText(inputEmail, email);
    });

    const inputPassword = getByPlaceholderText('Type Password');
    expect(inputPassword).toBeTruthy();
    act(() => {
      fireEvent.changeText(inputPassword, password);
    });

    const btnSubmit = getByTestId('btn-submit');
    expect(btnSubmit).toBeTruthy();
    act(() => {
      fireEvent.press(btnSubmit);
    });

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(1));
    expect(mockedNavigate).toHaveBeenCalledWith('HomeTabNavigator');
  });

  it('should show `hide-password` icon', () => {
    const { getByTestId } = render(<SignIn />, { wrapper });
    expect(getByTestId('icon-hide')).toBeTruthy();
  });

  it('should show `show-password` icon', () => {
    const { getByTestId } = render(<SignIn />, { wrapper });
    act(() => {
      fireEvent.press(getByTestId('hide-password'));
    });
    expect(getByTestId('icon-show')).toBeTruthy();
  });

  it('should show password icon', () => {
    const { result } = renderHook(() => useSignIn());
    expect(result.current.hidePassword).toBeTruthy();
  });

  it('should hide password text', () => {
    const { result } = renderHook(() => useSignIn());
    const { queryAllByTestId } = render(<SignIn />, { wrapper });

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

// describe('Testing react navigation', () => {
//   test('page contains the header and 10 items', async () => {
//     const component = (
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     );

//     const { findByText, findAllByText } = render(component);

//     const header = await findByText('List of numbers from 1 to 20');
//     const items = await findAllByText(/Item number/);

//     expect(header).toBeTruthy();
//     expect(items.length).toBe(10);
//   });
