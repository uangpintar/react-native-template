import 'react-native';
import { expect, it } from '@jest/globals';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks/native';
import React from 'react';
import SignIn from '../SignIn';
import { wrapper } from '../../../__mocks__/wrapper';
import { useSignIn } from '../SignIn/hook';
import { FOUserSection } from '../../components';
import { useGetUserListQuery } from '../../services';

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

    render(<FOUserSection />, { wrapper });

    const { result, waitForNextUpdate } = renderHook(() => useGetUserListQuery(undefined), {
      wrapper,
    });

    await waitForNextUpdate();
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();

    const { getByPlaceholderText, getByTestId } = render(<SignIn />, { wrapper });

    const inputEmail = getByPlaceholderText('Type Email');
    fireEvent.changeText(inputEmail, email);

    const inputPassword = getByPlaceholderText('Type Password');
    fireEvent.changeText(inputPassword, password);

    const btnSubmit = getByTestId('btn-submit');
    fireEvent.press(btnSubmit);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(1));
    expect(mockedNavigate).toHaveBeenCalledWith('HomeTabNavigator');
  });

  it('should show password text', () => {
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
